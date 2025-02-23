"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteAccountBtn() {
  return (
    <Button variant='destructive'>
      <Trash2 className='h-4 w-4 mr-2' />
      Eliminar
    </Button>
  );
}
