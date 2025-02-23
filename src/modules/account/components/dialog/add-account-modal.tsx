"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import CreateAccountForm from "../form/create-account-form";

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAccountModal({
  isOpen,
  onClose
}: AddAccountModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Añadir Nueva Cuenta</DialogTitle>
        </DialogHeader>
        <CreateAccountForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
