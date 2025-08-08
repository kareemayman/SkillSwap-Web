import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { validateEmail, validatePassword } from "../utils/validation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, signInWithGoogle } from "../firebase"
import left from "../assets/videos/hands .gif"
import { useTranslation } from "react-i18next"
import { createUserDoc } from "../utils/firestoreUtil"
import toast from "react-hot-toast"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailValidError, setEmailValidError] = useState("")
  const [passwordValidError, setPasswordValidError] = useState("")
  const [triedSubmit, setTriedSubmit] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (triedSubmit) {
      setEmailValidError(validateEmail(email))
      setPasswordValidError(validatePassword(password))
    }
  }, [email, password, triedSubmit])

  function handleSubmit(e) {
    e.preventDefault()
    setTriedSubmit(true)

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
        toast.success(t("Login.success", { name: user.displayName || user.email }))
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        toast.error(t("Login.error", { error: errorMessage }))
      })
  }

  function handleSignInWithGoogle() {
    signInWithGoogle()
      .then((res) => {
        const user = res.user
        console.log("Signed In as " + user.displayName)
        toast.success(t("Login.success", { name: user.displayName || user.email }))
        createUserDoc(user)
      })
      .catch((error) => {
        console.log(error)
        toast.error(t("Login.error", { error: error.message }))
      })
  }

  return (
    <>
      <div className="relative h-[calc(100dvh-80px)] overflow-hidden">
        <img
          src={left}
          alt="right illustration"
          className="hidden sm:block right-5 bottom-5 absolute w-40 md:w-60 animate-rotate-slow pointer-events-none"
        />

        <main className="flex flex-col justify-center items-center mx-auto pt-16 container">
          <h1 className="font-normal text-3xl text-center text-[var(--main-color)]">{t("Login.title")}</h1>

          <form
            className="flex flex-col mt-8 mb-6 min-w-[80%] sm:min-w-3/4 lg:min-w-[400px]"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className="mx-3 p-3  rounded-md text-black transition-all duration-300 placeholder-gray-500 bg-slate-50 dark:bg-[var(--color-text-primary)]"
            />

            <p className="mx-3 mb-6 text-red-500">{emailValidError}</p>

            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              className="mx-3 p-3  rounded-md text-black bg-slate-50 dark:bg-[var(--color-text-primary)] transition-all duration-300 placeholder-gray-500"
            />

            <p className="mx-3 mb-6 text-red-500">{passwordValidError}</p>

            <input
              type="submit"
              value={t("Login.button")}
              className="bg-[var(--color-btn-submit-bg)]  hover:bg-[var(--color-btn-submit-hover)] hover:shadow-md mx-auto p-3 rounded-md w-[95%] font-medium text-[#F7FAFC] transition-all duration-300 cursor-pointer"
            />
          </form>

          <Link
            to="/resetPassword"
            className="mb-3 text-[var(--color-text-secondary)] hover:text-[#0D80F2] underline transition-all duration-300"
          >
            {t("Login.forget")}
          </Link>

          <p className="mb-6 text-gray-600">{t("Login.alternative")}</p>

          <button
            onClick={handleSignInWithGoogle}
            className="flex justify-center items-center bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-md mx-auto mb-6 p-3 rounded-md min-w-[80%] sm:min-w-3/4 lg:min-w-[385px] font-medium text-[var(--color-text-light)] transition-all duration-300 cursor-pointer"
          >
            <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t("Login.google")}
          </button>

          <Link
            to="/register"
            className="mb-3 text-[var(--color-text-primary)] hover:text-[#0D80F2] underline transition-all duration-300"
          >
            {t("Login.footer")} {t("Login.link")}
          </Link>
        </main>
      </div>
    </>
  )
}

export default Login
