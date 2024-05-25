import "./globals.css";
import Link from "next/link";
import ChatBox from "./_components/UserChat/ChatBox";
import SignOutButton from "./_components/LoginSignOut/SignOutButton";
import LoginButton from "./_components/LoginSignOut/LoginButton";
import SignUpButton from "./_components/LoginSignOut/SignUpButton";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light">
      <body>
        <ChatBox />
        <div className="max-w-screen-2xl mx-auto px-4 py-8">
          <header className="flex bg-gray-100 border rounded-xl p-6 items-center">
            <Link
              href={"/"}
              className="font-bold text-xl flex-1">
              <div>Broken Pipe Plumbing</div>
            </Link>
            <nav className="flex gap-4 items-center">
              <Link href={"/appointment"}>
                <div className="font-bold">Book Now</div>
              </Link>

              <Link href={"/companyservices"}>
                <div className="font-bold">Services</div>
              </Link>

              <SignUpButton />
              <LoginButton />
              <SignOutButton />
            </nav>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
