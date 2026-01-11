"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";

export default function SignInPage() {
  const { isSignedIn } = useUser();
  const { theme, setTheme } = useTheme();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!isSignedIn) {
    return (
      <div className="flex min-h-screen justify-center">
        <SignIn
          appearance={{
            baseTheme: theme === "light" ? dark : undefined,
          }}
        />
      </div>
    );
  }
  return (
    <>
      <Link href="/">Go back to home</Link>
    </>
  );
}
