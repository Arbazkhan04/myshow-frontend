import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  User as UserIcon,
  Mail,
  Trash2,
  Calendar,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { User } from "@/types";
import { format } from "date-fns";

interface UserColumnsProps {
  onDeleteClick: (user: User) => void;
}

export const userColumns = ({
  onDeleteClick,
}: UserColumnsProps): ColumnDef<User>[] => [
  {
    accessorKey: "fullName",
    header: "Name",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            {user.profilePic ? (
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <UserIcon className="h-4 w-4 text-primary" />
            )}
          </div>
          <span className="font-medium text-foreground">{user.fullName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Badge variant="outline" className="capitalize">
          {user.gender?.toLowerCase() || "Not specified"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <Badge
            variant={user.role === "admin" ? "default" : "secondary"}
            className="capitalize"
          >
            {user.role}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const user = row.original;
      const statusVariant = user.status === "active" ? "default" : "secondary";
      return (
        <Badge variant={statusVariant} className="capitalize">
          {user.status}
        </Badge>
      );
    },
  },
  {
  accessorKey: "createdAt",
  header: "Joined Date",
  cell: ({ row }) => {
    const user = row.original
    const date = new Date((user as any).createdAt)
    const formattedDate = format(date, "do MMMM, yyyy") // e.g., "15th September, 2025"

    return (
      <div className="flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{formattedDate}</span>
      </div>
    )
  },
},
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDeleteClick(user)}
              className=""
            >
              <Trash2 className="h-4 w-4" />
            </Button>
        </div>
      );
    },
  },
];