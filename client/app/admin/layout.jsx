"use client";
import { usePathname } from "next/navigation";
import { auth } from "../firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import AdminMenu from "../_components/Admin/AdminMenu";

export default function Layout({ children }) {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (!user) {
    router.push("/adminSignInAndSignUp");
  }

  return (
    <div className="drawer bg-white">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col m-4 p-4">
        <div>{children}</div>
      </div>
      <AdminMenu />
    </div>
  );
}
