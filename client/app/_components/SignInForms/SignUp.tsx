import React from "react";
import { useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [
    createUserWithEmailAndPassword,
    signUpUser,
    signUpLoading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signUpAlert, setSignUpAlert] = useState("");
  const router = useRouter();

  const signUpFormSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(
        signupEmail,
        signupPassword
      );
      setSignupEmail("");
      setSignupPassword("");
      if (res) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (signUpError) {
      if (signUpError.message.includes("email-already-in-use")) {
        setSignUpAlert("Email already in use");
      } else {
        setSignUpAlert("");
      }
    }
  }, [signUpError]);
  return (
    <form
      className="w-1/3 flex flex-col justify-center p-5 border-gray-200"
      onSubmit={signUpFormSubmitHandler}>
      <h1 className="text-center mb-4">Admin SignUp</h1>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          className="grow"
          placeholder="Email"
          onChange={(e) => setSignupEmail(e.target.value)}
          onFocus={() => setSignUpAlert("")}
          value={signupEmail}
          required
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          onChange={(e) => setSignupPassword(e.target.value)}
          onFocus={() => setSignUpAlert("")}
          value={signupPassword}
          minLength={6}
          required
        />
      </label>
      <div className="min-h-[2em]">
        {!signUpError ? (
          <p
            className={`text-white text-xs py-2 ${signUpLoading ? "visible" : "invisible"}`}>
            please wait while signing you up ...
          </p>
        ) : (
          <p
            className={`text-red-500 text-xs py-2 ${signUpError ? "visible" : "invisible"}`}>
            {signUpError ? signUpAlert : " "}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-primary my-10 ">
        Sign Up
      </button>
    </form>
  );
}
