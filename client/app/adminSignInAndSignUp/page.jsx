"use client";

import { useState, useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import AdminSignIn from "../_components/AdminSignIn/AdminSignIn";
import AdminSignUp from "../_components/AdminSignIn/AdminSignUp";

export default function AdminSignInAndSignUp() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [user]);

  // useEffect(() => {
  //   if (signUpError) {
  //     if (signUpError.message.includes("email-already-in-use")) {
  //       setSignUpAlert("Email already in use");
  //     } else {
  //       setSignUpAlert("");
  //     }
  //   }
  // }, [signUpError]);

  // useEffect(() => {
  //   if (signInError) {
  //     if (signInError.message.includes("invalid-credential")) {
  //       setSignInAlert("Either email or password is incorrect");
  //     } else {
  //       setSignInAlert("");
  //     }
  //   }
  // }, [signInError]);

  // const signInFormSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await signInWithEmailAndPassword(signinEmail, signinPassword);
  //     setSigninEmail("");
  //     setSigninPassword("");
  //     if (res) {
  //       router.push("/admin/dashboard");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const signUpFormSubmitHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await createUserWithEmailAndPassword(
  //       signupEmail,
  //       signupPassword
  //     );
  //     setSignupEmail("");
  //     setSignupPassword("");
  //     if (res) {
  //       router.push("/admin/dashboard");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex min-h-screen">
        <AdminSignIn />
        <div className="w-px bg-gray-200 my-auto h-80 mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-40"></div>
        <AdminSignUp />
      </div>
    </div>
  );
}
