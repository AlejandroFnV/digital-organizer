"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import React from "react";
import { toast } from "sonner";

export default function SignInForm() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/accounts" // a url to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          toast("Por favor, espere...");
        },
        onSuccess: (ctx) => {
          toast("Success!");
        },
        onError: (ctx) => {
          // display the error message
          toast("Ha habido un error");
        }
      }
    );
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='email'>Email</Label>
          <Input
            name='email'
            placeholder='nombre@ejemplo.com'
            type='email'
            autoCapitalize='none'
            autoComplete='email'
            autoCorrect='off'
          />
        </div>
        <div className='grid gap-2'>
          <Label htmlFor='password'>Contraseña</Label>
          <Input name='password' type='password' />
        </div>
        <Button type='submit'>Iniciar sesión</Button>
      </div>
    </form>
  );
}
