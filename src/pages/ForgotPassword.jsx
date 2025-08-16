import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { validateEmail } from "../utils/validation";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (triedSubmit) {
      setEmailValidError(validateEmail(email));
    }
  }, [email, triedSubmit]);

  async function handleSubmit(e) {
    e.preventDefault();
    setTriedSubmit(true);

    const emailError = validateEmail(email);
    setEmailValidError(emailError);
    if (emailError) return;

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      console.error("Error sending reset email:", error);
      toast.error(getResetErrorMessage(error.code));
    } finally {
      setLoading(false);
    }
  }

  function getResetErrorMessage(code) {
    switch (code) {
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/invalid-email":
        return "Invalid email address.";
      default:
        return "Something went wrong. Please try again.";
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto px-3 pt-16 container">
        <h1 className="font-normal text-3xl text-center text-[var(--main-color)]">
          Forgot your password?
        </h1>
        <p className="mt-4 text-center text-[var(--color-text-secondary)]">
          Enter the email address associated with your account and we'll send
          you a link to reset your password
        </p>

        <form
          className="flex flex-col mt-8 mb-6 min-w-[80%] sm:min-w-3/4 lg:min-w-[500px]"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="mx-3 p-3 border-solid rounded-md outline-[#6A8FD9] placeholder:text-[var(--color-text-secondary)] transition-all duration-300 bg-slate-50 dark:bg-[var(--color-text-primary)] focus:bg-slate-50"
          />

          <p className="mx-3 mb-6 text-red-500">{emailValidError}</p>

          <button
            type="submit"
            disabled={loading}
            className={`flex items-center btn-gradient justify-center gap-2 bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-md p-2 rounded-md w-full text-[#F7FAFC] transition-all duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <span className="button-spinner"></span>
                Sending...
              </>
            ) : (
              "Submit"
            )}
          </button>

          <Link
            to={"/login"}
            className="mt-4 text-[#4A739C] hover:text-[#0D80F2] text-center underline transition-all duration-300"
          >
            Back to login
          </Link>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
