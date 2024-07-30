"use client";

import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, ChevronUp, MenuIcon } from "lucide-react";
import Link from "next/link";

import React from "react";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
// import Logo from "./Logo";

function HeaderSidebar() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="shrink-0 lg:hidden" size="icon" variant="outline">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <div className="mb-2 pb-6 border-b">{/* <Logo /> */}</div>
            <div className="space-y-6 mt-4">
              <SignedIn>
                <div className="">
                  <Link
                    href="/mentalhealth"
                    className="flex items-center justify-between"
                  >
                    <span>Generate</span>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
                <SignOutButton>
                  <div className="flex items-center justify-between">
                    Sign Out
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </SignOutButton>
              </SignedIn>
              <SignedOut>
                <Link
                  href="/mentalhealth"
                  className="flex items-center justify-between"
                >
                  Sign in <ChevronRight className="w-5 h-5" />
                </Link>
              </SignedOut>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default HeaderSidebar;
