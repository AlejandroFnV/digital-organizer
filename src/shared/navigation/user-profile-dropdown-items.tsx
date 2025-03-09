"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserProfileDialog } from "../user/user-profile-dialog";
import { User } from "better-auth";
import { User2 } from "lucide-react";

interface UserProfileDropdownItemsProps {
    user: User | undefined;
}

export function UserProfileDropdownItems({ user }: UserProfileDropdownItemsProps) {

    return (
        <>
            <UserProfileDialog user={user}>
                <DropdownMenuItem onSelect={(e) => {
                    e.preventDefault();
                }}>
                    <User2 className='h-4 w-4' />
                    <span>Cuenta</span>
                </DropdownMenuItem>
            </UserProfileDialog>
        </>
    );
}