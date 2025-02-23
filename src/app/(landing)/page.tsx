import Link from "next/link";
import { ArrowRight, KeyRound, Shield, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className='flex min-h-screen flex-col'>
      {/* Navbar */}
      <header className='border-b'>
        <div className='container mx-auto flex h-16 items-center justify-between px-4'>
          <div className='flex items-center gap-2'>
            <KeyRound className='h-6 w-6' />
            <span className='text-xl font-bold'>IdentiX</span>
          </div>
          <div className='flex items-center gap-4'>
            <Link href='/sign-in'>
              <Button variant='ghost'>Iniciar Sesión</Button>
            </Link>
            <Link href='/sign-up'>
              <Button>Crear Cuenta</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className='flex-1'>
        <div className='container mx-auto px-4 py-24 text-center'>
          <h1 className='mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
            Organiza tu vida digital
            <br />
            <span className='text-primary'>en un solo lugar</span>
          </h1>
          <p className='mx-auto mb-12 max-w-[600px] text-lg text-muted-foreground'>
            Gestiona todas tus cuentas digitales de forma segura. Nunca más
            olvides un usuario o contraseña.
          </p>
          <div className='flex justify-center gap-4'>
            <Link href='/sign-up'>
              <Button size='lg' className='gap-2'>
                Empezar Gratis
                <ArrowRight className='h-4 w-4' />
              </Button>
            </Link>
            <Link href='/sign-in'>
              <Button size='lg' variant='outline'>
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='border-t bg-muted/50'>
        <div className='container mx-auto px-4 py-24'>
          <h2 className='mb-12 text-center text-3xl font-bold'>
            Todo lo que necesitas para gestionar tus cuentas
          </h2>
          <div className='grid gap-8 md:grid-cols-3'>
            <div className='rounded-lg border bg-card p-6'>
              <Shield className='mb-4 h-12 w-12 text-primary' />
              <h3 className='mb-2 text-xl font-semibold'>Seguridad Total</h3>
              <p className='text-muted-foreground'>
                Tus datos están protegidos con la última tecnología en
                encriptación.
              </p>
            </div>
            <div className='rounded-lg border bg-card p-6'>
              <Smartphone className='mb-4 h-12 w-12 text-primary' />
              <h3 className='mb-2 text-xl font-semibold'>
                Acceso desde cualquier lugar
              </h3>
              <p className='text-muted-foreground'>
                Accede a tus cuentas desde cualquier dispositivo, en cualquier
                momento.
              </p>
            </div>
            <div className='rounded-lg border bg-card p-6'>
              <KeyRound className='mb-4 h-12 w-12 text-primary' />
              <h3 className='mb-2 text-xl font-semibold'>
                Organización intuitiva
              </h3>
              <p className='text-muted-foreground'>
                Interfaz visual que te permite encontrar tus cuentas
                rápidamente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='border-t'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <div className='flex items-center gap-2'>
              <KeyRound className='h-6 w-6' />
              <span className='text-xl font-bold'>IdentiX</span>
            </div>
            <p className='text-sm text-muted-foreground'>
              © 2024 IdentiX. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
