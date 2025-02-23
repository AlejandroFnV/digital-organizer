import { Card, CardContent } from "@/components/ui/card";
import type { Account } from "@prisma/client";
import { KeyRound, Clock, ShieldCheck } from "lucide-react";

interface AccountStatsProps {
  accounts: Account[];
}

export default function AccountStats({ accounts }: AccountStatsProps) {
  // Calcular estadísticas
  const totalAccounts = accounts.length;
  const recentAccounts = accounts.filter((account) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return new Date(account.createdAt) > thirtyDaysAgo;
  }).length;

  const secureAccounts = accounts.filter(
    (account) => account.password && account.password.length >= 12
  ).length;

  return (
    <div className='grid gap-4 md:grid-cols-3'>
      <Card>
        <CardContent className='flex items-center gap-4 p-6'>
          <KeyRound className='h-8 w-8 text-primary' />
          <div>
            <p className='text-sm font-medium text-muted-foreground'>
              Total de Cuentas
            </p>
            <h2 className='text-3xl font-bold'>{totalAccounts}</h2>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex items-center gap-4 p-6'>
          <Clock className='h-8 w-8 text-primary' />
          <div>
            <p className='text-sm font-medium text-muted-foreground'>
              Añadidas Recientemente
            </p>
            <h2 className='text-3xl font-bold'>{recentAccounts}</h2>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='flex items-center gap-4 p-6'>
          <ShieldCheck className='h-8 w-8 text-primary' />
          <div>
            <p className='text-sm font-medium text-muted-foreground'>
              Contraseñas Seguras
            </p>
            <h2 className='text-3xl font-bold'>{secureAccounts}</h2>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
