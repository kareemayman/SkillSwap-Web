import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, signInWithGoogle } from "../firebase";
import left from "../assets/images/left.svg";
import { useTranslation } from "react-i18next";
import Header from "../components/Header";
import { createUserDoc } from "../utils/firestoreUtil";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidError, setEmailValidError] = useState("");
  const [passwordValidError, setPasswordValidError] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (triedSubmit) {
      setEmailValidError(validateEmail(email));
      setPasswordValidError(validatePassword(password));
    }
  }, [email, password, triedSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setTriedSubmit(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        alert("Login successful");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Login failed, " + errorMessage);
      });
  }

  function handleSignInWithGoogle() {
    signInWithGoogle()
      .then((res) => {
        const user = res.user;
        console.log("Signed In as " + user.displayName);
        createUserDoc(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <img
          src={left}
          alt="right illustration"
          className="absolute bottom-5 right-5 w-40 md:w-60 pointer-events-none animate-rotate-slow"
        />

        <Header></Header>

        <main className="flex flex-col justify-center items-center mx-auto pt-16 container">
          <h1 className="font-normal text-3xl text-center">
            {t("Login.title")}
          </h1>

          <form
            className="flex flex-col mt-8 mb-6 min-w-[80%] sm:min-w-3/4 lg:min-w-[500px] "
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mx-3 p-3 border-[var(--color-card-content-border)] border-2 border-solid rounded-md outline-[#6A8FD9] placeholder:text-[var(--color-card-content-bg)] transition-all duration-300"
            />

            <p className="text-red-500 mb-6 mx-3">{emailValidError}</p>

            <input
              type="password"
              placeholder={t("password")}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mx-3 p-3 border-[var(--color-card-content-border)] border-2 border-solid rounded-md outline-[#6A8FD9] placeholder:text-[var(--color-card-content-bg)] transition-all duration-300"
            />

            <p className="text-red-500 mb-6 mx-3">{passwordValidError}</p>

            <input
              type="submit"
              value={t("Login.button")}
              className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-md p-2 rounded-md w-full text-[#F7FAFC] transition-all duration-300 cursor-pointer"
            />
          </form>

          <Link
            to="/resetPassword"
            className="mb-3 text-[#4A739C] hover:text-[#0D80F2] underline transition-all duration-300"
          >
            {t("Login.forget")}
          </Link>

          <p className="mb-6 text-[#4A739C]">{t("Login.alternative")}</p>

          <button
            onClick={handleSignInWithGoogle}
            className="bg-[var(--color-btn-submit-bg)] hover:shadow-md hover:bg-[var(--color-btn-submit-hover)] mb-6 p-2 rounded-md min-w-[80%] sm:min-w-3/4 lg:min-w-[500px] text-[#F7FAFC] transition-all duration-300 cursor-pointer"
          >
            {t("Login.google")}
          </button>

          <Link
            to="/register"
            className="mb-3 text-[#4A739C] hover:text-[#0D80F2] underline transition-all duration-300"
          >
            {t("Login.footer")} {t("Login.link")}
          </Link>
        </main>
      </div>
    </>
  );
};
