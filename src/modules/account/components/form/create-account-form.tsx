import { createAccount } from "@/modules/account/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateAccountForm({
  onClose
}: {
  onClose: () => void;
}) {
  return (
    <form action={createAccount} className='flex flex-col gap-4'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Nombre del Servicio</Label>
        <Input name='title' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='username'>URL</Label>
        <Input name='url' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='username'>Usuario</Label>
        <Input name='username' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='password'>Contraseña</Label>
        <Input name='password' type='password' />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='logo'>Notas</Label>
        <Textarea name='notes' />
      </div>
      <div className='flex justify-end gap-2'>
        <Button type='button' variant='outline' onClick={onClose}>
          Cancelar
        </Button>
        <Button type='submit'>Guardar</Button>
      </div>
    </form>
  );
}
