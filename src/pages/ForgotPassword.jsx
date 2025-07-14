import React, { useEffect, useState } from "react"
import logo from "../assets/images/skill.png"
import { Link } from "react-router-dom"

export const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [emailValidError, setEmailValidError] = useState("")
  const [triedSubmit, setTriedSubmit] = useState(false)

  useEffect(() => {
    if (triedSubmit) {
      setEmailValidError(validateEmail(email))
      setPasswordValidError(validatePassword(password))
    }
  }, [email, triedSubmit])

  function handleSubmit(e) {
    e.preventDefault()
    setTriedSubmit(true)

  }

  return (
    <>
      <header className="border-[#E5E8EB] border-b-2 border-solid">
        <div className="flex items-end gap-1 mx-auto px-4 sm:px-0 py-3 container">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <h1 className="font-bold text-2xl">SkillSwap</h1>
        </div>
      </header>

      <div className="flex flex-col justify-center items-center mx-auto pt-16 container px-3">
        <h1 className="font-normal text-3xl text-center">Forgot your password?</h1>
        <p className="mt-4 text-center">
          Enter the email address associated with your account and we'll send you a link to reset
          your password
        </p>

        <form className="flex flex-col mt-8 mb-6 min-w-[80%] sm:min-w-3/4 lg:min-w-[500px]" onSubmit={e => handleSubmit(e)}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className="mx-3 p-3 border-[#CFDBE8] border-2 border-solid rounded-md outline-[#6A8FD9] placeholder:text-[#4A739C] transition-all duration-300"
          />

          <p className="text-red-500 mb-6 mx-3">{emailValidError}</p>

          <input
            type="submit"
            value="Submit"
            className="bg-[#0D80F2] hover:shadow-md p-2 rounded-md w-full text-[#F7FAFC] transition-all duration-300 cursor-pointer"
          />

          <Link
            to={"/login"}
            className="text-center mt-4 hover:text-[#0D80F2] transition-all duration-300 underline text-[#4A739C]"
          >
            Back to login
          </Link>
        </form>
      </div>
    </>
  )
}
