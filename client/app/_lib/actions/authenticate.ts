import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("formData.entries()", formData.get("email"));
    console.log("formData.entries()", formData.get("password"));
    signIn("credentials", formData);
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
