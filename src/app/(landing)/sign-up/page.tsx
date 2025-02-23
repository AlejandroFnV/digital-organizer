import type React from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SignUpForm from "@/modules/auth/components/signup-form";

export default function RegisterPage() {
  return (
    <div className='container relative flex min-h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
        <div className='absolute inset-0 bg-primary' />
        <div className='relative z-20 flex items-center gap-2 text-lg font-medium'>
          <KeyRound className='h-6 w-6' />
          IdentiX
        </div>
        <div className='relative z-20 mt-auto'>
          <blockquote className='space-y-2'>
            <p className='text-lg'>
              Mantén todas tus cuentas organizadas y seguras en un solo lugar.
            </p>
            <footer className='text-sm'>El equipo de IdentiX</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Crea tu cuenta
            </h1>
            <p className='text-sm text-muted-foreground'>
              Ingresa tus datos para crear una cuenta nueva
            </p>
          </div>
          <Card>
            <CardContent className='pt-6'>
              <SignUpForm />
            </CardContent>
          </Card>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            ¿Ya tienes una cuenta?{" "}
            <Link
              href='/sign-in'
              className='underline underline-offset-4 hover:text-primary'
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
