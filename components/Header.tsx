"use client";
import Link from "next/link";
import HeaderSidebar from "./HeaderSidebar";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Example() {
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <HeaderSidebar />
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <SignedIn>
            <div className="flex flex-row gap-14 items-center">
              <Link
                href="/support"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Support
              </Link>
              <Link
                href="/mentalhealth"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Generate
              </Link>
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <Link
              href="/mentalhealth"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {" "}
              Sign in <span aria-hidden="true">&rarr;</span>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
