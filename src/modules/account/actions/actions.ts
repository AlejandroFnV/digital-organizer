"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createAccount(values: any) {
  try {
    await prisma.onlineAccount.create({
      data: {
        title: values.title,
        website: values.url || "",
        username: values.username,
        password: values.password,
        notes: values.notes || "",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    revalidatePath("/accounts");
  } catch (error) {
    console.error("Error creating account:", error);
    throw new Error("Error al crear la cuenta");
  }
}

export async function editAccount(id: string, values: any) {
  await prisma.onlineAccount.update({
    where: {
      id
    },
    data: {
      title: values.title,
      website: values.website,
      username: values.username,
      password: values.password,
      notes: values.notes,
      updatedAt: new Date()
    }
  });

  revalidatePath("/accounts");
}

export async function deleteAccount(id: string) {
  await prisma.onlineAccount.delete({
    where: {
      id: id
    }
  });

  revalidatePath("/accounts");
}
