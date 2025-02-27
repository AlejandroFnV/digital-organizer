"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues } from "react-hook-form";

interface InputFormProps {
  control: Control<FieldValues> | undefined;
  name: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  placeholder?: string;
}

export function InputForm({
  control,
  name,
  label,
  description,
  icon,
  placeholder
}: InputFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='flex items-center gap-2'>
            {icon}
            {label}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
