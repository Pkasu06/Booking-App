"use client";

import Link from "next/link";
import React from "react";
import { auth } from "@/app/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function () {
  const [user, loading, error] = useAuthState(auth);
  if (user) {
    return null;
  }
  return (
    <Link href={"/signup"}>
      <div className="border font-bold border-slate-900 p-2 rounded-lg w-24 text-center">
        Sign Up
      </div>
    </Link>
  );
}
