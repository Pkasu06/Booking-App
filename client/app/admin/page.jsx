"use client";

import { getSession } from "next-auth/react";
import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    async function returnSession() {
      const session = await getSession();
      console.log("session.user***************************", session.user);
    }
  }, []);

  return <div>Dashboard</div>;
}
