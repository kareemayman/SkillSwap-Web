import { useEffect, useState } from "react"
import { useAuth } from "../../contexts/Auth/context"
import { Link, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import left from "../../assets/videos/hands .gif"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const { user, error, loading, signInWithGoogle, signUp } = useAuth()

  const navigate = useNavigate()

  const { t } = useTranslation()

  useEffect(() => {
    if (user) {
      navigate("/profile")
    }
  }, [user, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    console.log("@handleSubmit ---- Sign up data:", formData)
    signUp(formData.email, formData.password, formData.name)
  }

  const handleGoogleSignUp = () => {
    console.log("@handleGoogleSignUp ---- clicked")
    signInWithGoogle()
  }
  return (
    <>
      <div
        className="right, flex flex-col bg-[linear-gradient( sm:px-6 lg:px-8 py-12 h-[calc(100dvh-80px)] to #d1c7b8b7, rgba(209, 199, 184, 0.56), rgba(172, 181, 151, 0.7) )]"
      >
                <img
                  src={left}
                  alt="right illustration"
                  className="hidden sm:block right-5 bottom-5 absolute w-40 md:w-60 animate-rotate-slow pointer-events-none"
                />
        
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 sm:px-10 py-8 sm:rounded-lg">
            <div className="mb-8">
              <h3 className="font-normal text-3xl text-center text-[var(--main-color)]">
                {t("Register.title")}
              </h3>
            </div>

            <div className="space-y-6">
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="block relative px-3 py-3 bg-slate-50 dark:bg-[var(--color-text-primary)] rounded-md w-full text-black sm:text-sm appearance-none placeholder-gray-500"
                  placeholder={t("name")}
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block relative px-3 py-3 bg-slate-50 dark:bg-[var(--color-text-primary)]rounded-md w-full text-black sm:text-sm appearance-none placeholder-gray-500"
                  placeholder={t("email")}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  className="block relative px-3 py-3 bg-slate-50 dark:bg-[var(--color-text-primary)] rounded-md w-full text-black sm:text-sm appearance-none placeholder-gray-500"
                  placeholder={t("password")}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="group relative flex justify-center bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] active:bg-black px-4 py-3 border border-transparent rounded-md w-full font-bold text-white text-sm active:scale-95 hover:cursor-pointer"
                >
                  {t("Register.button")}
                </button>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-center">
                <span className="text-gray-600 text-sm">
                  {t("Register.footer")}{" "}
                  <Link to="/login" className="font-medium text-[var(--color-text-primary)] hover:text-blue-700">
                    {t("Register.link")}
                  </Link>
                </span>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div  />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-[rgba(172, 181, 151, 0.7)] px-2 text-gray-500">{t("Register.alternative")}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="inline-flex justify-center bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] shadow-sm px-4 py-3   rounded-md w-full font-bold text-[var(--color-text-light)] text-sm hover:cursor-pointer"
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
                  {t("Register.google")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
