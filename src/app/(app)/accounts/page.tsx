import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AccountCard from "@/modules/account/components/card/account-card";
import { KeyRound, PlusCircle, Search } from "lucide-react";
import AddAccountBtn from "@/modules/account/components/button/add-account-btn";
import { prisma } from "@/lib/db";
import { Input } from "@/components/ui/input";
import { OnlineAccount } from "@prisma/client";

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
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Buscar cuentas..." 
              className="pl-9 h-10 w-full"
            />
          </div>
          <AddAccountBtn />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {accounts.map((account: OnlineAccount) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </div>
  );
}
