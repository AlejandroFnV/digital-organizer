"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { Account } from "@prisma/client";

interface AccountCardProps {
  account: Account;
  view?: "grid" | "list";
}

export default function AccountCard({
  account,
  view = "grid"
}: AccountCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  if (view === "list") {
    return (
      <div className='flex items-center justify-between p-4 rounded-lg border bg-card'>
        <div className='flex items-center gap-4'>
          <div className='h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center bg-muted'>
            {/* <img
              src={account.logo || "/placeholder.svg"}
              alt={`${account.name} logo`}
              className='h-8 w-8 object-contain'
            /> */}
          </div>
          <div>
            <h3 className='font-semibold'>{account?.title}</h3>
            <p className='text-sm text-muted-foreground'>{account.username}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className='h-4 w-4' />
            ) : (
              <Eye className='h-4 w-4' />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <MoreVertical className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem asChild>
                <Link href={`/accounts/${account.id}`}>Ver detalles</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className='text-destructive'>
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  }

  return (
    <Card className='overflow-hidden hover:shadow-lg transition-shadow'>
      <Link href={`/accounts/${account.id}`}>
        <CardContent className='p-6'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='h-12 w-12 rounded-lg overflow-hidden flex items-center justify-center bg-muted'>
              {/* <img
                src={account.logo || "/placeholder.svg"}
                alt={`${account.name} logo`}
                className='h-8 w-8 object-contain'
              /> */}
            </div>
            <h3 className='font-semibold text-lg'>{account?.title}</h3>
          </div>

          <div className='space-y-2'>
            <div>
              <label className='text-sm text-muted-foreground'>Usuario:</label>
              <p className='font-medium'>{account.username}</p>
            </div>

            <div>
              <label className='text-sm text-muted-foreground'>
                Contraseña:
              </label>
              <div className='flex items-center gap-2'>
                <p className='font-medium'>
                  {showPassword ? account.password : "••••••••"}
                </p>
                <Button
                  variant='ghost'
                  size='sm'
                  className='h-8 w-8 p-0'
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
