"use client";

import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, Pencil, Save } from "lucide-react";
import { OnlineAccount } from "@prisma/client";
import { useAccountCardLogic } from "../../hooks/use-account-card-logic";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AccountCardProps {
  account: OnlineAccount;
}

export default function AccountCard({ account }: AccountCardProps) {
  const {
    handleCopyPassword,
    handleCopyUsername,
    // handleVisitWebsite,
    handleDeleteAccount,
    handleUpdateAccount,
    showPassword,
    setShowPassword,
    getDomain
  } = useAccountCardLogic(account);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAccount, setEditedAccount] = useState({
    username: account.username,
    password: account.password,
    title: account.title,
    website: account.website || ""
  });

  const accountDomain = getDomain(account.website || "");

  const handleSaveChanges = async () => {
    await handleUpdateAccount(account.id, editedAccount);
    setIsEditing(false);
  };

  return (
    <>
      <div onClick={() => setOpen(true)} className="shadow border rounded-md items-center justify-center py-8 flex flex-col gap-4 cursor-pointer">
        <img className="w-16 h-16 rounded-full" alt="" src={`https://logo.clearbit.com/${accountDomain}`} />
        <span className="text-secondary font-bold">{account.title}</span>
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(false)} >
        <DialogContent>
          <div className="flex items-center justify-center flex-col gap-6">
            <img className="w-16 h-16 rounded-full" alt="" src={`https://logo.clearbit.com/${accountDomain}`} />
            {isEditing ? (
              <Input
                value={editedAccount.title}
                onChange={(e) => setEditedAccount({ ...editedAccount, title: e.target.value })}
                className="text-center font-bold"
              />
            ) : (
              <DialogTitle>{account.title}</DialogTitle>
            )}
          </div>

          <div className="flex flex-col gap-4">
            {/* Usuario */}
            <div className="flex flex-col gap-2">
              <span className="text-secondary font-bold">Usuario</span>
              <div className="flex items-center justify-between">
                {isEditing ? (
                  <Input
                    value={editedAccount.username}
                    onChange={(e) => setEditedAccount({ ...editedAccount, username: e.target.value })}
                    className="text-sm"
                  />
                ) : (
                  <span className="text-sm text-gray-500">{account.username}</span>
                )}
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyUsername();
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copiar usuario</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-secondary font-bold">Contraseña</span>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">
                      {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    </span>
                  </Button>
                )}
              </div>
              <div className="flex items-center justify-between">
                {isEditing ? (
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={editedAccount.password}
                    onChange={(e) => setEditedAccount({ ...editedAccount, password: e.target.value })}
                    className="text-sm font-mono"
                  />
                ) : (
                  <span className="text-sm text-gray-500 font-mono">
                    {showPassword ? account.password : "********"}
                  </span>
                )}
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyPassword();
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copiar contraseña</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Sitio web - solo visible en modo edición */}
            {isEditing && (
              <div className="flex flex-col gap-2">
                <span className="text-secondary font-bold">Sitio web</span>
                <Input
                  value={editedAccount.website}
                  onChange={(e) => setEditedAccount({ ...editedAccount, website: e.target.value })}
                  className="text-sm"
                  placeholder="https://ejemplo.com"
                />
              </div>
            )}

            {/* Botones de acción */}
            <div className="pt-4 border-t flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedAccount({
                        username: account.username,
                        password: account.password,
                        title: account.title,
                        website: account.website || ""
                      });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="default"
                    className="w-1/2"
                    onClick={handleSaveChanges}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-1/2"
                    onClick={async (e) => {
                      e.stopPropagation();
                      await handleDeleteAccount();
                      setOpen(false);
                    }}
                  >
                    Eliminar cuenta
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
