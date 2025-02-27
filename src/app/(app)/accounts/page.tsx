import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AccountCard from "@/modules/account/components/card/account-card";
import { KeyRound, PlusCircle } from "lucide-react";
import AddAccountBtn from "@/modules/account/components/button/add-account-btn";
import { prisma } from "@/lib/db";

export default async function DigitalLifePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return redirect("/");
  }

  // This would come from your database in a real app
  // const accounts = [
  //   {
  //     id: "1",
  //     name: "Gmail",
  //     username: "user@gmail.com",
  //     website: "https://gmail.com",
  //     category: "Email",
  //     icon: "https://www.google.com/gmail/about/static/images/logo-gmail.png?fingerprint=c2eaf4aae389c3f885e97081bb197b97",
  //     lastUpdated: "2023-10-15"
  //   },
  //   {
  //     id: "2",
  //     name: "Spotify",
  //     username: "username",
  //     website: "https://spotify.com",
  //     category: "Entertainment",
  //     icon: "https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png",
  //     lastUpdated: "2023-11-20"
  //   },
  //   {
  //     id: "3",
  //     name: "GitHub",
  //     username: "devuser",
  //     website: "https://github.com",
  //     category: "Development",
  //     icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  //     lastUpdated: "2023-12-05"
  //   },
  //   {
  //     id: "4",
  //     name: "Amazon",
  //     username: "user@email.com",
  //     website: "https://amazon.com",
  //     category: "Shopping",
  //     icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  //     lastUpdated: "2024-01-10"
  //   },
  //   {
  //     id: "5",
  //     name: "Netflix",
  //     username: "user@email.com",
  //     website: "https://netflix.com",
  //     category: "Entertainment",
  //     icon: "https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png",
  //     lastUpdated: "2024-02-15"
  //   },
  //   {
  //     id: "6",
  //     name: "Twitter",
  //     username: "@username",
  //     website: "https://twitter.com",
  //     category: "Social",
  //     icon: "https://about.twitter.com/content/dam/about-twitter/x/brand-toolkit/logo-black.png.twimg.1920.png",
  //     lastUpdated: "2024-02-20"
  //   }
  // ];

  // const accounts = [];

  const accounts = await prisma.onlineAccount.findMany();
  console.log({ accounts });

  if (accounts.length === 0) {
    return (
      <div className='h-[80vh] w-full flex items-center justify-center'>
        <div className='text-center space-y-6 max-w-md mx-auto px-4'>
          <div className='relative mx-auto w-24 h-24 mb-8 rounded-full bg-primary/10 flex items-center justify-center'>
            <KeyRound className='w-12 h-12 text-primary animate-pulse' />
            <div className='absolute -right-2 -top-2'>
              <div className='relative'>
                <div className='absolute inset-0 animate-ping'>
                  <PlusCircle className='w-6 h-6 text-primary' />
                </div>
                <PlusCircle className='w-6 h-6 text-primary relative' />
              </div>
            </div>
          </div>

          <h2 className='text-2xl font-bold tracking-tight'>
            ¡Hora de asegurar tu vida digital!
          </h2>

          <p className='text-muted-foreground'>
            Comienza creando tu primera cuenta segura. Mantén todas tus
            contraseñas organizadas y protegidas en un solo lugar.
          </p>

          <div className='pt-4'>
            <AddAccountBtn />
          </div>

          <p className='text-xs text-muted-foreground pt-8'>
            Tus datos están seguros y encriptados. Solo tú tienes acceso a
            ellos.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4'>
      <AddAccountBtn />
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
