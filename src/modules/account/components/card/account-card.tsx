"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Copy, ExternalLink, MoreHorizontal, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { OnlineAccount } from "@prisma/client";

interface AccountCardProps {
  account: OnlineAccount;
}

export default function AccountCard({ account }: AccountCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(account.username);
    toast.success("Username copied to clipboard");
  };

  const handleCopyPassword = () => {
    // In a real app, you would retrieve the password from a secure store
    navigator.clipboard.writeText("••••••••••••");
    toast.success("Password copied to clipboard");
  };

  const handleVisitWebsite = () => {
    if (account.website) {
      window.open(account.website, "_blank");
    }
  };

  // Extract domain from website for display
  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 flex items-center justify-center text-lg font-semibold object-center text-primary bg-primary/10 rounded-full">
            <span>{account.title.charAt(0).toUpperCase()}</span>
          </div>
          <CardTitle className="text-base font-medium">{account.title}</CardTitle>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={handleVisitWebsite}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Visit website
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyUsername}>
              <Copy className="mr-2 h-4 w-4" />
              Copy username
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyPassword}>
              <Lock className="mr-2 h-4 w-4" />
              Copy password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-0">
        {/* Username */}
        <div className="border-t border-border/30 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Username</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{account.username}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCopyUsername}
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy username</span>
            </Button>
          </div>
        </div>

        {/* Password */}
        <div className="border-t border-border/30 px-4 py-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Password</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium font-mono">
              {showPassword ? "password123" : "••••••••••••"}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleCopyPassword}
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy password</span>
            </Button>
          </div>
        </div>
      </CardContent>

      {account.website && (
        <CardFooter className="p-0">
          <Button
            variant="ghost"
            className="w-full rounded-none h-10 border-t border-border/30 text-primary"
            onClick={handleVisitWebsite}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit {getDomain(account.website)}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
