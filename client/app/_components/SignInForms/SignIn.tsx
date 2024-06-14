"use client";
import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { authenticate } from "@/app/_lib/actions/authenticate";

export default function SignIn() {
  const router = useRouter();

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");
  const [loginErrorMessage, loginDispatch] = useFormState(
    authenticate,
    undefined
  );

  const [signInAlert, setSignInAlert] = useState("");

  return (
    <form
      className="w-1/3 flex flex-col justify-center p-5"
      action={async (formData) => {
        const response = loginDispatch(formData);
      }}
      // onSubmit={signInFormSubmitHandler}
    >
      <h1 className="text-center mb-4 mt-1">Admin SignIn</h1>
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
          onChange={(e) => setSigninEmail(e.target.value)}
          onFocus={() => setSignInAlert("")}
          value={signinEmail}
          name="email"
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
          name="password"
          onChange={(e) => setSigninPassword(e.target.value)}
          onFocus={() => setSignInAlert("")}
          value={signinPassword}
          minLength={6}
          required
        />
      </label>
      <div className="min-h-[2em]">
        {/* {!signInError ? (
          <p
            className={`text-white text-xs py-2 ${signInLoading ? "visible" : "invisible"}`}>
            please wait while signing you in ...
          </p>
        ) : (
          <p
            className={`text-red-500 text-xs py-2 ${signInError ? "visible" : "invisible"}`}>
            {signInError ? signInAlert : " "}
          </p>
        )} */}
      </div>
      <button
        type="submit"
        className="btn btn-primary my-10">
        Sign in
      </button>
    </form>
  );
}
