"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

export default function NextAuthProvider({children}): React.JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}