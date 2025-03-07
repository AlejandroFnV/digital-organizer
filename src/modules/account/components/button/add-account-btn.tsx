"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AddAccountModal from "../dialog/add-account-modal";

export default function AddAccountBtn() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <PlusCircle className='mr-2 h-4 w-4' />
        Añadir Cuenta
      </Button>

      <AddAccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
