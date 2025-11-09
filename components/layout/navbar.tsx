"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sparkles, User } from "lucide-react";

export function Navbar() {
  const { data: session, status } = useSession();
  const hasAuth = status !== "loading"; // Auth is available if status is defined

  return (
    <nav className="glass border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-blue-400" />
          <span className="text-xl font-bold gradient-text">AI Dashboard</span>
        </Link>

        {hasAuth && (
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{session.user?.email || session.user?.name}</span>
                </div>
                <Button variant="ghost" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Button onClick={() => signIn()}>Sign In</Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
