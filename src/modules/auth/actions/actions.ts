"use server";

import { auth } from "@/lib/auth";

export async function signUp(formData: FormData) {
  // const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const response = await auth.api.signInEmail({
    body: {
      email,
      password
    },
    asResponse: true
  });

  console.log({ response });
}
