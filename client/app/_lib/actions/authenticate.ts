"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const callbackUrl = formData.get("callbackUrl").toString();
  const email = formData.get("email").toString();
  const password = formData.get("password").toString();
  try {
    await signIn("credentials", {
      redirectTo: callbackUrl,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      //TODO what happens if error redirect to login again? or display page with error?
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
