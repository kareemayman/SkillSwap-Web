import { getUserById, updateUserById } from "../utils/firestoreUtil"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function PaymentSuccess() {
  const [sessionId, setSessionId] = useState("")
  const [paymentType, setPaymentType] = useState("")
  const [userId, setUserId] = useState("")
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setSessionId(p.get("session_id") || "")
    const type = p.get("paymentType") || ""
    const userI = p.get("userId") || ""
    setUserId(userI)
    setPaymentType(type)

    if (userI.trim() !== "") {
      getUserById(userI)
        .then((user) => {
          setCurrentUser(user.data())
        })
        .catch((error) => {
          console.error("Error fetching user:", error)
          toast.error("Failed to fetch user details.")
        })
    }
  }, [])

  useEffect(() => {
    if (currentUser) {
      // Show toast depending on payment type
      if (paymentType === "subscribtion") {
        const newUserData = {
          ...currentUser,
          subscribtion: { ...currentUser.subscribtion, plan: "pro" },
        }
        console.log(currentUser, "upgrading to Pro")
        updateUserById(userId, newUserData).then(() => {
          toast.success("Your account has been upgraded to Pro!")
        })
      } else if (type === "trade") {
        toast.success("Trade payment successful!")
      } else {
        toast.success("Payment successful!")
      }
    }
  }, [currentUser])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Payment Success ✅</h1>
      <p>
        {paymentType === "subscription"
          ? "Thanks! Your Pro subscription is now active."
          : paymentType === "trade"
          ? "Thanks! Your trade payment was completed."
          : "Thanks! Your payment was completed."}
      </p>
      {sessionId && <p className="mt-2 text-sm opacity-80">Session ID: {sessionId}</p>}
      <p className="mt-4">
        We’ll confirm on the server via webhook and update your account or trade.
      </p>
    </div>
  )
}
