"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant='ghost'
      onClick={() => router.replace("/accounts")}
      className='flex items-center gap-2'
    >
      <ArrowLeft className='h-4 w-4' />
      Volver
    </Button>
  );
}
