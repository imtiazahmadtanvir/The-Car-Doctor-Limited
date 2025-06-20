"use client";

import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";

interface NextAuthProviderProps {
  children: ReactNode;
}

export default function NextAuthProvider({ children }: NextAuthProviderProps): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
