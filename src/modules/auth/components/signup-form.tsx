"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function SignUpForm() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;


    await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/dashboard" // a url to redirect to after the user verifies their email (optional)
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
    <form
      // action={signUp}
      onSubmit={onSubmit}
    >
      <div className='grid gap-4'>
        <div className='grid gap-2'>
          <Label htmlFor='name'>Nombre</Label>
          <Input name='name' placeholder='Tu nombre' />
        </div>
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
        <Button type='submit'>Crear cuenta</Button>
      </div>
    </form>
  );
}
