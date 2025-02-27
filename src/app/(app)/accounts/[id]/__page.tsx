"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Edit2, Save, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";

interface Account {
  id: number;
  name: string;
  username: string;
  password: string;
  logo: string;
  createdAt: string;
  lastModified: string;
  notes: string;
  url: string;
}

export default function AccountDetailPage({
  params
}: {
  params: { id: string };
}) {
  const router = useRouter();

  // Simulando datos de cuenta - En una app real, estos vendrían de una base de datos
  const [account, setAccount] = useState<Account>({
    id: Number.parseInt(params.id),
    name: "Netflix",
    username: "usuario@email.com",
    password: "contraseña123",
    logo: "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/227_Netflix_logo-512.png",
    createdAt: "2024-02-22T10:00:00Z",
    lastModified: "2024-02-22T10:00:00Z",
    notes: "Cuenta familiar compartida con 4 perfiles",
    url: "https://netflix.com"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedAccount, setEditedAccount] = useState(account);

  const handleSave = () => {
    setAccount({
      ...editedAccount,
      lastModified: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    // Aquí implementarías la lógica de eliminación
    router.replace("/accounts");
  };

  return (
    <div className='container mx-auto p-6 max-w-3xl'>
      <div className='flex items-center justify-between mb-8'>
        <Button
          variant='ghost'
          onClick={() => router.replace("/accounts")}
          className='flex items-center gap-2'
        >
          <ArrowLeft className='h-4 w-4' />
          Volver
        </Button>
        <div className='flex gap-2'>
          {isEditing ? (
            <>
              <Button variant='ghost' onClick={() => setIsEditing(false)}>
                <X className='h-4 w-4 mr-2' />
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                <Save className='h-4 w-4 mr-2' />
                Guardar
              </Button>
            </>
          ) : (
            <>
              <Button variant='outline' onClick={() => setIsEditing(true)}>
                <Edit2 className='h-4 w-4 mr-2' />
                Editar
              </Button>
              <Button variant='destructive' onClick={handleDelete}>
                <Trash2 className='h-4 w-4 mr-2' />
                Eliminar
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardContent className='p-6'>
          <div className='flex items-center gap-6 mb-8'>
            <div className='h-24 w-24 rounded-xl overflow-hidden flex items-center justify-center bg-gray-100'>
              <img
                src={account.logo || "/placeholder.svg"}
                alt={`${account.name} logo`}
                className='h-16 w-16 object-contain'
              />
            </div>
            <div className='flex-1'>
              {isEditing ? (
                <Input
                  value={editedAccount.name}
                  onChange={(e) =>
                    setEditedAccount({ ...editedAccount, name: e.target.value })
                  }
                  className='text-2xl font-bold mb-2'
                />
              ) : (
                <h1 className='text-2xl font-bold mb-2'>{account.name}</h1>
              )}
              <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar className='h-4 w-4' />
                  Creado: {format(new Date(account.createdAt), "dd/MM/yyyy")}
                </div>
                <div>
                  Última modificación:{" "}
                  {format(new Date(account.lastModified), "dd/MM/yyyy")}
                </div>
              </div>
            </div>
          </div>

          <div className='grid gap-6'>
            <div className='grid gap-2'>
              <label className='font-medium'>URL del servicio</label>
              {isEditing ? (
                <Input
                  value={editedAccount.url}
                  onChange={(e) =>
                    setEditedAccount({ ...editedAccount, url: e.target.value })
                  }
                />
              ) : (
                <a
                  href={account.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-primary hover:underline'
                >
                  {account.url}
                </a>
              )}
            </div>

            <div className='grid gap-2'>
              <label className='font-medium'>Usuario</label>
              {isEditing ? (
                <Input
                  value={editedAccount.username}
                  onChange={(e) =>
                    setEditedAccount({
                      ...editedAccount,
                      username: e.target.value
                    })
                  }
                />
              ) : (
                <p>{account.username}</p>
              )}
            </div>

            <div className='grid gap-2'>
              <label className='font-medium'>Contraseña</label>
              {isEditing ? (
                <Input
                  type='password'
                  value={editedAccount.password}
                  onChange={(e) =>
                    setEditedAccount({
                      ...editedAccount,
                      password: e.target.value
                    })
                  }
                />
              ) : (
                <p>••••••••</p>
              )}
            </div>

            <div className='grid gap-2'>
              <label className='font-medium'>Notas</label>
              {isEditing ? (
                <Textarea
                  value={editedAccount.notes}
                  onChange={(e) =>
                    setEditedAccount({
                      ...editedAccount,
                      notes: e.target.value
                    })
                  }
                  rows={4}
                />
              ) : (
                <p className='whitespace-pre-wrap'>{account.notes}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
