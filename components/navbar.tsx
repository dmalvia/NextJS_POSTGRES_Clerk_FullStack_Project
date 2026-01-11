"use client";

import { SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import ThemeToggle from "./theme-toggle";
import { Map, MessageSquare, Shield, Sparkle } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Sparkle className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold">Feedback Fusion</span>
            </div>
          </Link>
          <Link
            href="/roadmap"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <Map className="h-4 w-4" />
            Roadmap
          </Link>
          <Link
            href="/feedback"
            className="text-sm hover:text-primary flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>
          {/* Simple: Just show Admin link to everyone */}
          <SignedIn>
            <Link
              href="/admin"
              className="text-sm hover:text-primary transition-colors flex items-center gap-1"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
          </SignedIn>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <SignedOut>
            <SignInButton>
              <Button asChild>
                <Link href="/sign-in" scroll={true}>
                  Sign In
                </Link>
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
