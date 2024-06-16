"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { auth } from "@/app/firebase/config";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { sideNavItems } from "@/constants";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AdminMenu() {
  const pathname = usePathname();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  //need useEffect b/c component needs to be mounted before being able to route

  return (
    <div>
      <ul className="menu p-4 w-80 min-h-full text-base-content">
        {sideNavItems.map((item) => (
          <li
            key={item.label}
            className={`mb-4 rounded-lg text-center ${pathname === item.href ? "bg-black" : ""}`}>
            <Link href={item.href}>
              <button
                className={`p-2 flex flex-row justify-between font-bold ${
                  pathname == item?.href ? "text-white" : "text-gray-600"
                }`}>
                <p>{item.label}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </button>
            </Link>
          </li>
        ))}
        <li>
          <Link
            className="btn"
            href={"/signout"}>
            Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}
