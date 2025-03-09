import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { KeyRound, PlusCircle } from "lucide-react";
import AddAccountBtn from "@/modules/account/components/button/add-account-btn";
import { prisma } from "@/lib/db";
import AccountSearch from "@/modules/account/components/search/account-search";

export default async function DigitalLifePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return redirect("/");
  }

  const accounts = await prisma.onlineAccount.findMany();

  if (accounts.length === 0) {
    return (
      <div className='h-[80vh] w-full flex items-center justify-center'>
        <div className='text-center space-y-6 max-w-md mx-auto px-4'>
          <div className='relative mx-auto w-24 h-24 mb-8 rounded-full bg-primary/10 flex items-center justify-center'>
            <KeyRound className='w-12 h-12 text-primary animate-pulse' />
            <div className='absolute -right-2 -top-2'>
              <div className='relative'>
                <div className='absolute inset-0 animate-ping'>
                  <PlusCircle className='w-6 h-6 text-primary' />
                </div>
                <PlusCircle className='w-6 h-6 text-primary relative' />
              </div>
            </div>
          </div>

          <h2 className='text-2xl font-bold tracking-tight'>
            ¡Hora de asegurar tu vida digital!
          </h2>

          <p className='text-muted-foreground'>
            Comienza creando tu primera cuenta segura. Mantén todas tus
            contraseñas organizadas y protegidas en un solo lugar.
          </p>

          <div className='pt-4'>
            <AddAccountBtn />
          </div>

          <p className='text-xs text-muted-foreground pt-8'>
            Tus datos están seguros y encriptados. Solo tú tienes acceso a
            ellos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Mis Cuentas</h1>
        <AddAccountBtn />
      </div>
      
      {/* Show input search and online accounts */}
      <AccountSearch initialAccounts={accounts} />
    </div>
  );
}
