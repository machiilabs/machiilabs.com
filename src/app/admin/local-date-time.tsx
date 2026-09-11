"use client";

import { useEffect, useState } from "react";

export function LocalDateTime({ iso }: { iso: string }) {
  const [label, setLabel] = useState("");

  useEffect(() => {
    setLabel(
      new Date(iso).toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    );
  }, [iso]);

  return <time dateTime={iso}>{label || "\u00a0"}</time>;
}
