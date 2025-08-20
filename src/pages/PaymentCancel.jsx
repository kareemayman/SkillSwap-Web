import toast from "react-hot-toast"
import { useEffect, useState } from "react"

export default function PaymentCancel() {
  const [paymentType, setPaymentType] = useState("")

  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    const type = p.get("paymentType") || ""
    setPaymentType(type)
    // Show toast depending on payment type
    if (type === "subscribtion") {
      toast.error("Pro subscription payment was canceled.")
    } else if (type === "trade") {
      toast.error("Trade payment was canceled.")
    } else {
      toast.error("Payment was canceled.")
    }
  }, [])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Payment Canceled ❌</h1>
      <p>
        {paymentType === "subscription"
          ? "Your Pro subscription payment was canceled. No charge was made."
          : paymentType === "trade"
          ? "Your trade payment was canceled. No charge was made."
          : "No charge was made. You can try again anytime."}
      </p>
    </div>
  )
}
