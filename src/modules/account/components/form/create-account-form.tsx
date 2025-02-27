"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Globe,
  User,
  Lock,
  StickyNote,
  Eye,
  EyeOff,
  RefreshCw,
  Briefcase,
  Check
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { useCreateAccountFormLogic } from "../../hooks/use-create-account-form-logic";
import { InputForm } from "@/shared/components/form/input-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

export default function CreateAccountForm({
  onClose
}: {
  onClose: () => void;
}) {
  const {
    onSubmit,
    showPassword,
    password,
    setPassword,
    passwordStrength,
    generatePassword,
    setShowPassword,
    form,
    getPasswordStrengthColor
  } = useCreateAccountFormLogic();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className='space-y-6'
      >
        <InputForm
          control={form.control}
          name='title'
          label='Nombre del servicio'
          icon={<Briefcase className='h-4 w-4 text-muted-foreground' />}
          placeholder='ej. Gmail, Twitter, Netflix'
        />

        <InputForm
          control={form.control}
          name='url'
          label='URL'
          icon={<Globe className='h-4 w-4 text-muted-foreground' />}
          placeholder='https://ejemplo.com'
        />

        <InputForm
          control={form.control}
          name='username'
          label='Usuario'
          icon={<User className='h-4 w-4 text-muted-foreground' />}
          placeholder='usuario@email.com'
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='flex items-center gap-2'>
                <Lock className='h-4 w-4 text-muted-foreground' />
                Contraseña
              </FormLabel>
              <FormControl>
                <div className='relative'>
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    className='pr-24'
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      field.onChange(e);
                    }}
                  />
                  <div className='absolute right-0 top-0 h-full flex items-center gap-1 pr-2'>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='h-7 w-7'
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className='h-4 w-4' />
                            ) : (
                              <Eye className='h-4 w-4' />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {showPassword
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='h-7 w-7'
                            onClick={() => {
                              const newPassword = generatePassword();
                              setPassword(newPassword);
                              field.onChange(newPassword);
                            }}
                          >
                            <RefreshCw className='h-4 w-4' />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Generar contraseña segura
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </FormControl>
              <div className='space-y-1'>
                <Progress
                  value={passwordStrength}
                  className={`${getPasswordStrengthColor(passwordStrength)}`}
                />
                <div className='flex justify-between text-xs'>
                  <span className='text-muted-foreground'>
                    Fortaleza de la contraseña:
                  </span>
                  <span
                    className={
                      passwordStrength === 100
                        ? "text-green-500 font-medium"
                        : "text-muted-foreground"
                    }
                  >
                    {passwordStrength <= 25 && "Débil"}
                    {passwordStrength > 25 &&
                      passwordStrength <= 50 &&
                      "Regular"}
                    {passwordStrength > 50 && passwordStrength <= 75 && "Buena"}
                    {passwordStrength > 75 && "Excelente"}
                  </span>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <InputForm
          control={form.control}
          name='notes'
          label='Notas'
          icon={<StickyNote className='h-4 w-4 text-muted-foreground' />}
          placeholder='Información adicional sobre la cuenta...'
        />

        <div className='flex justify-end gap-2 pt-4'>
          <Button type='button' variant='outline' onClick={onClose}>
            Cancelar
          </Button>
          <Button type='submit' className='gap-2'>
            <Check className='h-4 w-4' />
            Guardar
          </Button>
        </div>
      </form>
    </Form>
  );
}
