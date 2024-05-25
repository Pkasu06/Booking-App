"use client";

import Link from "next/link";
import React from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
export default function SignOutButton() {
  const [user, loading, error] = useAuthState(auth);
  if (!user) {
    return null;
  }
  return (
    <Link
      className="btn btn-sm btn-warning"
      href={"/signout"}>
      <div>Sign out</div>
    </Link>
  );
}
