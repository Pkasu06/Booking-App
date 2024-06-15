"use server";

import { signIn } from "@/auth";
import SignIn from "../_components/SignInForms/SignIn";

export default async function LoginPage({ searchParams }) {
  const { callbackUrl } = searchParams;
  return (
    <div className="flex justify-center">
      {<SignIn callbackUrl={callbackUrl} />}
    </div>
  );
}
