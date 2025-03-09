import { OnlineAccount } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { deleteAccount, editAccount } from "../actions/actions";

export const useAccountCardLogic = (account: OnlineAccount) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleCopyUsername = () => {
        navigator.clipboard.writeText(account.username);
        toast.success("Username copied to clipboard");
    };

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(account.password);
        toast.success("Password copied to clipboard");
    };

    const handleVisitWebsite = () => {
        if (account.website) {
            window.open(account.website, "_blank");
        }
    };

    const handleUpdateAccount = async (accountId: string, values: any) => {
        await editAccount(accountId, {
            title: values.title,
            username: values.username,
            password: values.password,
            notes: values.notes,
            website: values.website
        });
    };

    const handleDeleteAccount = async () => {
        await deleteAccount(account.id);
        toast.success("Cuenta eliminada.");
    };

    // Extract domain from website for display
    const getDomain = (url: string) => {
        try {
            return new URL(url).hostname.replace('www.', '');
        } catch {
            return url;
        }
    };

    return {
        showPassword,
        setShowPassword,
        handleCopyUsername,
        handleCopyPassword,
        handleVisitWebsite,
        handleDeleteAccount,
        handleUpdateAccount,
        getDomain
    }
}