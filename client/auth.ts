import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth as firebaseAuth } from "./app/firebase/config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;
        return null;
        const { email, password } = credentials;

        // logic to salt and hash password
        const pwHash = credentials.password;

        // logic to verify if user exists
        try {
          const userCredential = await signInWithEmailAndPassword(
            firebaseAuth,
            email as string,
            password as string
          );
          const token = await userCredential.user.getIdToken();
          return {
            id: userCredential.user.uid,
            user: userCredential.user,
            idToken: token,
          };
        } catch (error) {
          console.log("Error during sign in:", error.message);
          return null;
        }

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
});
