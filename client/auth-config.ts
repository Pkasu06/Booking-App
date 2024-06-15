import { NextAuthConfig } from "next-auth";
const AUTH_SECRET = process.env.AUTH_SECRET;

const authConfig = {
  pages: {
    signIn: "/login",
  },
  secret: AUTH_SECRET,
  //used for creating token and session
  callbacks: {
    //is use authorized if not then rout to signIn page above
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      // console.log("auth in auth config", auth);
      //todo CHECK firebase AUTH TOKEN
      if (isLoggedIn) return true;

      return false; // Redirect unauthenticated users to login page
    },
    async session({ session, token }) {
      //add data to session and will be available with getServerSession
      // console.log("session token", token);
      // console.log(' session ', session);
      // console.log('session user ', user);

      // session.user.addded = 'extra image';
      // session.user.userId = token.userId;
      //! session will be available to front end as getserversession
      return {
        ...session,
        userId: token.userId,
        image: "image here",
        user: {
          ...session.user,
        },
      };
    },
    async jwt({ token, session, account, profile, user }) {
      //!user at first signin is defined with auth data after it will be undefined
      //!so first time around user is truthy then second time around
      //!its not and so we just return what ever the token is as to not change it previous token is an argument on every call
      if (user) {
        // console.log("token in jwt", Object.entries(token));
        // console.log("user in jwt", user.user.email);

        return {
          ...token,
          userId: user.id,
          //@ts-expect-error email does exist on user
          email: user?.user?.email,
        };
      }

      //!return shape of token with data you want ... call function for something here
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
