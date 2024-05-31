"use client";
import Link from "next/link";
import React from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function LoginButton() {
  const [user, loading, error] = useAuthState(auth);
  if (user) return null;
  return (
    <Link href={"/login"}>
      <div className="bg-slate-900 font-bold p-2 rounded-lg text-white w-24 text-center">
        Login
      </div>
    </Link>
  );
}
