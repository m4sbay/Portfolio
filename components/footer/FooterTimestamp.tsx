"use client";

import { useEffect, useState } from "react";

function getDeviceMonthYear() {
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function FooterTimestamp() {
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    setTimestamp(getDeviceMonthYear());
  }, []);

  return <span suppressHydrationWarning>{timestamp || "2026"}</span>;
}
