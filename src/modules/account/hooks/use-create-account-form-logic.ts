"use client";

import { AccountFormValues, AccountSchema } from "../validation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "../actions/actions";
import { toast } from "sonner";

export const useCreateAccountFormLogic = () => {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      title: "",
      url: "",
      username: "",
      password: "",
      notes: ""
    }
  });

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const calculatePasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.match(/[A-Z]/)) strength += 25;
    if (pass.match(/[0-9]/)) strength += 25;
    if (pass.match(/[^A-Za-z0-9]/)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 25) return "bg-destructive";
    if (strength <= 50) return "bg-yellow-500";
    if (strength <= 75) return "bg-blue-500";
    return "bg-green-500";
  };

  // const generatePassword = () => {
  //   const chars =
  //     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  //   let newPassword = "";
  //   for (let i = 0; i < 16; i++) {
  //     newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   setPassword(newPassword);
  //   toast.success("Contraseña generada");
  // };

  const generatePassword = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    let newPassword = "";
    for (let i = 0; i < 16; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
    form.setValue("password", newPassword);
    return newPassword; // Devolvemos la nueva contraseña
  };

  const onSubmit = async (values: AccountFormValues) => {
    console.log({ values });

    // const newOnlineAccount = {
    //   title: formData.get("title"),
    //   tiurlle: formData.get("url"),
    //   username: formData.get("username"),
    //   password: formData.get("password"),
    //   notes: formData.get("notes")
    // };

    // const result = AccountSchema.safeParse(newOnlineAccount);
    // if (!result.success) {
    //   let errorMessage = "";

    //   result.error.issues.forEach((issue) => {
    //     errorMessage =
    //       errorMessage + issue.path[0] + ": " + issue.message + ". ";
    //   });

    //   toast.error(errorMessage);
    // }

    try {
      await createAccount(values);
      toast.success("Cuenta creada exitosamente");
    } catch (error) {
      console.log({ error });

      toast.error("Error al crear la cuenta");
    }
  };

  const passwordStrength = calculatePasswordStrength(password);

  return {
    onSubmit,
    showPassword,
    password,
    setPassword,
    passwordStrength,
    generatePassword,
    setShowPassword,
    getPasswordStrengthColor,
    form
  };
};
