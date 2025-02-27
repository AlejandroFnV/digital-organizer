"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, Copy, ExternalLink, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Account {
  id: string;
  name: string;
  username: string;
  website: string;
  category: string;
  icon: string;
  lastUpdated: string;
}

interface AccountCardProps {
  account: Account;
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
    window.open(account.website, "_blank");
  };

  return (
    <Card className='overflow-hidden transition-all hover:shadow-md'>
      <CardHeader className='p-4 pb-0 flex justify-between items-start'>
        <div className='flex items-center gap-3'>
          <div className='h-10 w-10 overflow-hidden rounded-md bg-muted flex items-center justify-center'>
            <img
              // src={account.icon || "/placeholder.svg"}
              alt={account.name}
              className='h-full w-full object-contain'
              // onError={(e) => {
              //   e.currentTarget.src = "/placeholder.svg?height=40&width=40";
              // }}
            />
          </div>
          <div>
            <h3 className='font-medium text-base'>{account.name}</h3>
            <p className='text-xs text-muted-foreground'>{account.category}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='h-8 w-8'>
              <MoreHorizontal className='h-4 w-4' />
              <span className='sr-only'>More options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={handleVisitWebsite}>
              <ExternalLink className='mr-2 h-4 w-4' />
              Visit website
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyUsername}>
              <Copy className='mr-2 h-4 w-4' />
              Copy username
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyPassword}>
              <Lock className='mr-2 h-4 w-4' />
              Copy password
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='M12 20h9' />
                <path d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z' />
              </svg>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className='text-destructive focus:text-destructive'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='M3 6h18' />
                <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                <line x1='10' x2='10' y1='11' y2='17' />
                <line x1='14' x2='14' y1='11' y2='17' />
              </svg>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className='p-4'>
        <div className='space-y-2'>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground'>Username</span>
            <div className='flex items-center gap-1'>
              <span className='text-sm font-medium'>{account.username}</span>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6'
                onClick={handleCopyUsername}
              >
                <Copy className='h-3 w-3' />
                <span className='sr-only'>Copy username</span>
              </Button>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            <span className='text-sm text-muted-foreground'>Password</span>
            <div className='flex items-center gap-1'>
              <span className='text-sm font-medium'>
                {showPassword ? "password123" : "••••••••••••"}
              </span>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6'
                onClick={() => setShowPassword(!showPassword)}
              >
                <Lock className='h-3 w-3' />
                <span className='sr-only'>
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
              <Button
                variant='ghost'
                size='icon'
                className='h-6 w-6'
                onClick={handleCopyPassword}
              >
                <Copy className='h-3 w-3' />
                <span className='sr-only'>Copy password</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex justify-between'>
        <span className='text-xs text-muted-foreground'>
          Updated: {new Date(account.lastUpdated).toLocaleDateString()}
        </span>
        <Button
          variant='outline'
          size='sm'
          className='h-8 px-2 text-xs'
          onClick={handleVisitWebsite}
        >
          <ExternalLink className='mr-1 h-3 w-3' />
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
}
