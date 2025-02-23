import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DigitalLifePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return redirect("/");
  }
  
  console.log({ session });

  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-muted/20'>
      <div className='absolute inset-0 bg-grid-black/[0.02] -z-10' />
      <div className='container mx-auto p-6 max-w-7xl'>
        {/* Header con estadísticas */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            Mi Vida Digital
          </h1>
          {/* <AccountStats accounts={accounts} /> */}
        </div>

        {/* Controles y Categorías */}
        {/* <div className='flex flex-col gap-6 mb-8'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-1 gap-4 max-w-md'>
              <div className='relative flex-1'>
                <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                <Input
                  placeholder='Buscar cuentas...'
                  className='pl-9'
                  defaultValue={q}
                />
              </div>
              <CategoryManager categories={categories} />
            </div>

            <div className='flex items-center gap-4'>
              <AddAccountBtn />
            </div>
          </div>
        </div> */}

        {/* Grid de cuentas */}
        {/* <div
          className={
            searchParams.view === "list"
              ? "space-y-4"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          }
        >
          {accounts.length === 0 ? (
            <div className='col-span-full text-center py-12'>
              <div className='mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-4'>
                <Tags className='h-12 w-12 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-semibold mb-2'>
                No se encontraron cuentas
              </h3>
              <p className='text-muted-foreground mb-4'>
                Comienza añadiendo tu primera cuenta
              </p>
              <AddAccountBtn />
            </div>
          ) : (
            accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                view={searchParams.view || "grid"}
              />
            ))
          )}
        </div> */}
      </div>
    </div>
  );
}
