"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import AccountCard from "@/modules/account/components/card/account-card";
import { OnlineAccount } from "@prisma/client";

interface AccountSearchProps {
  initialAccounts: OnlineAccount[];
}

export default function AccountSearch({ initialAccounts }: AccountSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filtrar cuentas basadas en el término de búsqueda
  const filteredAccounts = initialAccounts.filter((account) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      account.title.toLowerCase().includes(searchLower) ||
      account.username.toLowerCase().includes(searchLower) ||
      (account.website && account.website.toLowerCase().includes(searchLower))
    );
  });

  return (
    <>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-1 sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar cuentas..." 
            className="pl-9 h-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAccounts.length > 0 ? (
          filteredAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-muted-foreground">No se encontraron cuentas que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </>
  );
}