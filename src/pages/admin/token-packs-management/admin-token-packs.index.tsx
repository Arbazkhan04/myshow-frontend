"use client";

import { useGetAllTokenPacksQuery } from "@/api/tokenPack";
import { DataTable } from "@/components/ui/data-table";
import { type ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TokenPackFormDialog } from "./admin-token-packs.form";
import { ViewTokenPackDialog } from "./admin-token-packs.view";

export type TokenPack = {
  _id: string;
  name: string;
  tokens: number;
  priceUSD: number;
  isActive: boolean;
  description: string;
};

export function AdminTokenPacksIndex() {
  const { data, isLoading, isError } = useGetAllTokenPacksQuery();

  const [editPack, setEditPack] = useState<TokenPack | null>(null);
  const [viewPack, setViewPack] = useState<TokenPack | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const columns: ColumnDef<TokenPack>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "tokens", header: "Tokens" },
    { accessorKey: "priceUSD", header: "Price ($)" },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) =>
        row.original.isActive ? (
          <span className="text-green-600 font-medium">Active</span>
        ) : (
          <span className="text-red-500 font-medium">Inactive</span>
        ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const pack = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewPack(pack)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setEditPack(pack)}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading token packs...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-destructive">
          <p>Error loading token packs</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      {/* Header */}
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Token Pack
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data?.body?.tokenPacks || []}
      />

      {/* View */}
      {viewPack && (
        <ViewTokenPackDialog
          tokenPack={viewPack}
          onClose={() => setViewPack(null)}
        />
      )}

      {/* Create */}
      {isCreateOpen && (
        <TokenPackFormDialog onClose={() => setIsCreateOpen(false)} />
      )}

      {/* Edit */}
      {editPack && (
        <TokenPackFormDialog
          tokenPack={editPack}
          onClose={() => setEditPack(null)}
        />
      )}
    </div>
  );
}
