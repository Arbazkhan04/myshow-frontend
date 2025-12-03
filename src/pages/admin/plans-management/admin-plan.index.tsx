"use client";

import { useGetAllPlansQuery } from "@/api/plan";
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
import { PlanFormDialog } from "./admin-plan.form";
import { DeletePlanDialog } from "./admin-plan.delete.modal";
import { ViewPlanDialog } from "./admin-plan.view.modal";

export type Plan = {
  _id: string;
  tier: string;
  name: string;
  interval: string;
  priceUSD: number;
  tokensPerPeriod: number;
  queuePriority: number;
  features: string[];
  isActive: boolean;
  description: string;
};

export function AdminPlansIndex() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { data, isLoading, isError } = useGetAllPlansQuery({ page, limit });

  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [viewPlan, setViewPlan] = useState<Plan | null>(null);

  const columns: ColumnDef<Plan>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "tier", header: "Tier" },
    { accessorKey: "interval", header: "Interval" },
    { accessorKey: "priceUSD", header: "Price ($)" },
    { accessorKey: "tokensPerPeriod", header: "Tokens" },
    { accessorKey: "queuePriority", header: "Priority" },
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
        const plan = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setViewPlan(plan)}>
                View
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setEditPlan(plan)}>
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setDeleteId(plan._id)}
              >
                Delete
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
          <p className="mt-2 text-muted-foreground">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-destructive">
          <p>Error loading plans data</p>
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
          Create Plan
        </Button>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={data?.body?.data || []}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        totalPages={data?.body?.totalPages || 1}
        isPagination
      />

      {/* View */}
      {viewPlan && (
        <ViewPlanDialog
          plan={viewPlan}
          onClose={() => setViewPlan(null)}
        />
      )}

      {/* Create */}
      {isCreateOpen && (
        <PlanFormDialog onClose={() => setIsCreateOpen(false)} />
      )}

      {/* Edit */}
      {editPlan && (
        <PlanFormDialog
          plan={editPlan}
          onClose={() => setEditPlan(null)}
        />
      )}

      {/* Delete */}
      {deleteId && (
        <DeletePlanDialog
          id={deleteId}
          onClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
}
