import type React from "react";
import Link from "next/link";
import { KeyRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SignInForm from "@/modules/auth/components/signin-form";

export default function LoginPage() {
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
              Esta aplicación ha simplificado completamente la forma en que
              gestiono mis cuentas digitales.
            </p>
            <footer className='text-sm'>Sofia Rodriguez</footer>
          </blockquote>
        </div>
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>
              Bienvenido de nuevo
            </h1>
            <p className='text-sm text-muted-foreground'>
              Ingresa tus credenciales para acceder a tu cuenta
            </p>
          </div>
          <Card>
            <CardContent className='pt-6'>
              <SignInForm />
            </CardContent>
          </Card>
          <p className='px-8 text-center text-sm text-muted-foreground'>
            ¿No tienes una cuenta?{" "}
            <Link
              href='/sign-up'
              className='underline underline-offset-4 hover:text-primary'
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
