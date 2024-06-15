export { auth as middleware } from "@/auth";

export const config = {
  matcher: [
    "/admin", //block admin page
    "/admin/:path*", //block any admin childroutes
  ],
};
