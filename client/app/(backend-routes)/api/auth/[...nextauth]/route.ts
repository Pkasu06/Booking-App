import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "@/app/firebase/config";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // try {
        //   const userCredential = await signInWithEmailAndPassword(
        //     auth,
        //     email,
        //     password
        //   );
        //   const token = await userCredential.user.getIdToken();
        //   return { id: userCredential.user.uid, user: userCredential };
        // } catch (error) {
        //   console.log("Error during sign in:", error.message);
        //   return null;
        // }

        return { id: "made one " };
      },
    }),
  ],
});
