"use client";

import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import SignIn from "../_components/SignInForms/SignIn";
import SignUp from "../_components/SignInForms/SignUp";

export default function AdminSignInAndSignUp() {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  //user already logged in redirect to dashboard
  useEffect(() => {
    if (user) {
      router.push("/admin/dashboard");
    }
  }, [user]);

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
        <SignIn />
        <div className="w-px bg-gray-200 my-auto h-80 mx-4 sm:mx-6 md:mx-10 lg:mx-20 xl:mx-40"></div>
        <SignUp />
      </div>
    </div>
  );
}
