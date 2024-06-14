const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      if (isLoggedIn) return true;

      return false; // Redirect unauthenticated users to login page
    },
  },
};

export default authConfig;
