import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/Auth/context";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import left from "../../assets/videos/hands .gif";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { user, error, loading, signInWithGoogle, signUp } = useAuth();

  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // console.log("@handleSubmit ---- Sign up data:", formData)
    signUp(formData.email, formData.password, formData.name);
  };

  const handleGoogleSignUp = () => {
    // console.log("@handleGoogleSignUp ---- clicked");
    signInWithGoogle().then((user) => {
      console.log("Signed Up as " + user.displayName + " / " + user);
      navigate(`/profile/${user.uid}`);
    });
  };
  return (
    <>
      <div className="relative h-[calc(100dvh-80px)] overflow-hidden">
        <img
          src={left}
          alt="right illustration"
          className="hidden sm:block right-5 bottom-5 absolute w-40 md:w-60 animate-rotate-slow pointer-events-none"
        />

        <main className="flex flex-col justify-center items-center mx-auto pt-16 container">
          <h1 className="font-normal text-3xl text-center text-[var(--main-color)]">{t("Register.title")}</h1>

          <div className="flex flex-col mt-8 mb-6 min-w-[80%] sm:min-w-3/4 lg:min-w-[400px]">
            <input
              id="name"
              name="name"
              type="text"
              className="mx-3 p-3 rounded-md text-black transition-all duration-300 placeholder-gray-500 bg-slate-50 dark:bg-[var(--color-text-primary)]"
              placeholder={t("name")}
              value={formData.name}
              onChange={handleInputChange}
            />

            <p className="mx-3 mb-6 text-red-500"></p>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className="mx-3 p-3 rounded-md text-black transition-all duration-300 placeholder-gray-500 bg-slate-50 dark:bg-[var(--color-text-primary)]"
              placeholder={t("email")}
              value={formData.email}
              onChange={handleInputChange}
            />

            <p className="mx-3 mb-6 text-red-500"></p>

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="mx-3 p-3 rounded-md text-black transition-all duration-300 placeholder-gray-500 bg-slate-50 dark:bg-[var(--color-text-primary)]"
              placeholder={t("password")}
              value={formData.password}
              onChange={handleInputChange}
            />

            <p className="mx-3 mb-6 text-red-500"></p>

            <input
              type="button"
              onClick={handleSubmit}
              value={t("Register.button")}
              className="btn-gradient bg-[var(--color-btn-submit-bg)]  hover:bg-[var(--color-btn-submit-hover)] hover:shadow-md mx-auto p-3 rounded-md w-[95%] font-medium text-[#F7FAFC] transition-all duration-300 cursor-pointer"
            />
          </div>

          <p className="mb-6 text-gray-500">{t("Register.alternative")}</p>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="flex justify-center btn-gradient items-center bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-md mx-auto mb-6 p-3 rounded-md min-w-[80%] sm:min-w-3/4 lg:min-w-[385px] font-medium dark:text-[var(--color-text-light)] text-white transition-all duration-300 cursor-pointer"
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

          <div className="text-center">
            <Link to="/login" className=" text-[var(--color-text-secondary)] hover:text-[#0D80F2] underline transition-all duration-300">
              {t("Register.footer")} {t("Register.link")}
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
