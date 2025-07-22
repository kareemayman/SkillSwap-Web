import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailValidError, setEmailValidError] = useState("");
  const [triedSubmit, setTriedSubmit] = useState(false);

  useEffect(() => {
    if (triedSubmit) {
      setEmailValidError(validateEmail(email));
      setPasswordValidError(validatePassword(password));
    }
  }, [email, triedSubmit]);

  function handleSubmit(e) {
    e.preventDefault();
    setTriedSubmit(true);
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center mx-auto px-3 pt-16 container">
        <h1 className="font-normal text-3xl text-center">
          Forgot your password?
        </h1>
        <p className="mt-4 text-center">
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
            className="mx-3 p-3 border-[#CFDBE8] border-2 border-solid rounded-md outline-[#6A8FD9] placeholder:text-[#4A739C] transition-all duration-300"
          />

          <p className="mx-3 mb-6 text-red-500">{emailValidError}</p>

          <input
            type="submit"
            value="Submit"
            className="bg-[var(--color-btn-submit-bg)] hover:bg-[var(--color-btn-submit-hover)] hover:shadow-md p-2 rounded-md w-full text-[#F7FAFC] transition-all duration-300 cursor-pointer"
          />

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
