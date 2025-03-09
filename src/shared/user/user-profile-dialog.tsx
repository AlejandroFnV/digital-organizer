"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "better-auth";

interface UserProfileDialogProps {
  user: User | undefined;
  children: React.ReactNode;
}

export function UserProfileDialog({ user, children }: UserProfileDialogProps) {
  const [open, setOpen] = useState(false);

  // Obtener iniciales para el avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Perfil de Usuario</DialogTitle>
          <DialogDescription>
            Visualiza y edita tu información de perfil.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user?.image || ""} alt={user?.name || "Usuario"} />
            <AvatarFallback className="text-xl">
              {user?.name ? getInitials(user.name) : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="grid w-full gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <div className="rounded-md border p-2">{user?.name}</div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="rounded-md border p-2">{user?.email}</div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => { }}>Cambiar contraseña</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}