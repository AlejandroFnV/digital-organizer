import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Copy, ExternalLink, Lock, MoreHorizontal, Pencil, Trash2 } from "lucide-react";

interface AccountCardDropdownMenuProps {
    handleVisitWebsite: () => void;
    handleCopyUsername: () => void;
    handleCopyPassword: () => void;
    handleDeleteAccount: () => Promise<void>;
}

export default function AccountCardDropdownMenu({
    handleVisitWebsite,
    handleCopyUsername,
    handleCopyPassword,
    handleDeleteAccount,
}: AccountCardDropdownMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleVisitWebsite}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit website
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyUsername}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy username
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyPassword}>
                    <Lock className="mr-2 h-4 w-4" />
                    Copy password
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDeleteAccount}
                    className="text-destructive focus:text-destructive"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}