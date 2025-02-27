import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import BackButton from "@/shared/components/button/back-button";
import { AtSign, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import DeleteAccountModal from "@/modules/account/components/dialog/delete-account-dialog";
import React from "react";

export default async function AccountDetailPage({
  params
}: {
  params: { id: string };
}) {
  const { id: accountId } = await params;

  const account = await prisma.account.findUnique({
    where: {
      id: accountId
    }
  });

  return (
    <div className='container mx-auto p-6 max-w-3xl'>
      <div className='flex items-center justify-between mb-8'>
        <BackButton />
        <div className='flex gap-2'>
          <DeleteAccountModal accountId={accountId} />
        </div>
      </div>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-6 mb-8'>
            <div className='h-24 w-24 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100'>
              <AtSign />
            </div>
            <div className='flex-1'>
              <h1 className='text-2xl font-bold mb-2'>{account?.title}</h1>
              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  Creado:{" "}
                  {format(new Date(account?.createdAt ?? ""), "dd/MM/yyyy")}
                </div>
                <div>
                  Última modificación:{" "}
                  {format(new Date(account?.updatedAt ?? ""), "dd/MM/yyyy")}
                </div>
              </div>
            </div>
          </div>

          <div className='grid gap-6'>
            <div className='grid gap-2'>
              <Label className='font-medium'>URL del servicio</Label>
              <a
                href={account?.url}
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary hover:underline'
              >
                {account?.url}
              </a>
            </div>

            <div className='grid gap-2'>
              <Label className='font-medium'>Usuario</Label>
              <span>{account?.username}</span>
            </div>

            <div className='grid gap-2'>
              <Label className='font-medium'>Contraseña</Label>
              <span>••••••••</span>
            </div>

            <div className='grid gap-2'>
              <Label className='font-medium'>Notas</Label>
              <span>{account?.notes}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
