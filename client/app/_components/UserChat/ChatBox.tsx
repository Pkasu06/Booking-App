"use client";

import React, { useEffect, useState } from "react";
import useDrift from "../../_hooks/liveChat-api/useDrift";
import { usePathname } from "next/navigation";

export default function ChatBox() {
  const [shouldUseDrift, setShouldUseDrift] = useState(true);

  const pathname = usePathname();
  useDrift();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let adminURL = pathname.includes("admin");

    // console.log(pathname, shouldUseDrift);

    // @ts-expect-error
    if (adminURL && window?.drift?.api?.widget) {
      // @ts-expect-error
      window?.drift.api.widget.hide();
      //  @ts-expect-error
    } else if (!adminURL && window?.drift?.api?.widget) {
      //  @ts-expect-error
      window?.drift.api.widget.show();
    }
    setShouldUseDrift(adminURL ? false : true);
  }, [pathname]);

  return null;
}
