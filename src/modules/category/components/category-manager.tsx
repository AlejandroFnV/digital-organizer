"use client";

import type React from "react";

import { useState } from "react";
import { Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category } from "@prisma/client";

interface CategoryManagerProps {
  categories: Category[];
}

export default function CategoryManager({ categories }: CategoryManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (editingCategory) {
      // Actualizar categoría existente
      await fetch(`/api/categories/${editingCategory.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: formData.get("name"),
          color: formData.get("color")
        })
      });
    } else {
      // Crear nueva categoría
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify({
          name: formData.get("name"),
          color: formData.get("color")
        })
      });
    }

    setIsOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = async (categoryId: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE"
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <Tags className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start' className='w-48'>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={() => setEditingCategory(null)}>
              Nueva Categoría
            </DropdownMenuItem>
          </DialogTrigger>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.id}
              className='flex items-center justify-between'
            >
              <span className='flex items-center gap-2'>
                <span
                  className='h-2 w-2 rounded-full'
                  style={{ backgroundColor: category.color }}
                />
                {category.name}
              </span>
              <div className='flex items-center gap-2'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditingCategory(category);
                    setIsOpen(true);
                  }}
                  className='text-sm text-muted-foreground hover:text-foreground'
                >
                  Editar
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(category.id);
                  }}
                  className='text-sm text-destructive hover:text-destructive/80'
                >
                  Eliminar
                </button>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Editar Categoría" : "Nueva Categoría"}
          </DialogTitle>
          <DialogDescription>
            {editingCategory
              ? "Modifica los detalles de la categoría"
              : "Crea una nueva categoría para organizar tus cuentas"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Nombre</Label>
            <Input
              id='name'
              name='name'
              defaultValue={editingCategory?.name}
              required
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='color'>Color</Label>
            <Input
              id='color'
              name='color'
              type='color'
              defaultValue={editingCategory?.color || "#3b82f6"}
              required
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button type='submit'>
              {editingCategory ? "Guardar Cambios" : "Crear Categoría"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
