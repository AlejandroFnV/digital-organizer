import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import {
  AtSign,
  ChevronUp,
  LogOut,
  User2
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserProfileDropdownItems } from "./user-profile-dropdown-items";

// Menu items.
const items = [
  {
    title: "Cuentas",
    url: "/accounts",
    icon: AtSign
  }
];

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return (
    <Sidebar collapsible='icon'>
      {/* variant="sidebar | floating | inset" */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session?.user?.name}
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <UserProfileDropdownItems user={session?.user} />
                <DropdownMenuItem>
                  <form
                    action={async () => {
                      "use server";
                      await auth.api.signOut({
                        headers: await headers()
                      });
                      redirect("/");
                    }}
                  >
                    <button className="flex items-center gap-2" type='submit'>
                      <LogOut className='h-4 w-4' />
                      <span>Cerrar sesión</span>
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
