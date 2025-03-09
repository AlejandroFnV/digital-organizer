"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { UserProfileDialog } from "../user/user-profile-dialog";
import { User } from "better-auth";

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
                    <span>Cuenta</span>
                </DropdownMenuItem>
            </UserProfileDialog>
        </>
    );
}