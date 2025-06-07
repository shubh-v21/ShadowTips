"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 border-b border-cyan-900/40 bg-gradient-to-r from-gray-900 to-slate-900 text-cyan-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link href="/" className="mb-4 md:mb-0">
          <Logo />
        </Link>
        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="text-cyan-300 font-medium">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-transparent hover:bg-cyan-900/30 border border-cyan-400/50 text-cyan-300 hover:text-cyan-100"
              variant="outline"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              className="w-full md:w-auto bg-transparent hover:bg-cyan-900/30 border border-cyan-400/50 text-cyan-300 hover:text-cyan-100"
              variant="outline"
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
