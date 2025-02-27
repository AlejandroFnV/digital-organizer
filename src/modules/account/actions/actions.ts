"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createAccount(values: any) {
  console.log({ values });

  try {
    await prisma.onlineAccount.create({
      data: {
        title: values.title,
        url: values.url || "",
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

export async function editAccount(formData: FormData) {
  await prisma.account.update({
    where: {
      id: formData.get("id") as string
    },
    data: {
      title: formData.get("title") as string,
      url: formData.get("url") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      notes: formData.get("notes") as string
    }
  });

  revalidatePath("/accounts");
}

export async function deleteAccount(id: string) {
  await prisma.account.delete({
    where: {
      id: id
    }
  });

  revalidatePath("/accounts");
}
