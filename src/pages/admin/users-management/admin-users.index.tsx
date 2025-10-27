import { useState } from "react";
import { useFilterUsersQuery, useDeleteUserMutation } from "@/api/user";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "sonner";
import type { User } from "@/types";
import { userColumns } from "./admin-users.columns";
import { DeleteUserModal } from "./admin-users.delete.modal";

export function AdminUsersIndex() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { data, isLoading, error, refetch } = useFilterUsersQuery({ page, limit });
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async (user: User) => {
    try {
      const response = await deleteUser({
        id: user._id,
      }).unwrap() as any;

      toast(response.message || "User deleted successfully", {
        description: "User has been deleted successfully",
      });

      setIsDeleteDialogOpen(false);
      setUserToDelete(null);
      refetch();
    } catch (error: any) {
      toast(error.data?.message || "Error", {
        description: error.data?.message?.description || "Failed to delete user",
      });
    }
  };

  const columns = userColumns({
    onDeleteClick: handleDeleteClick,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-destructive">
          <p>Error loading users data</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={(data as any).body!.data || []}
        page={page}
        setPage={setPage}
        totalPages={(data as any).body!.totalPages || 1}
        limit={limit}
        setLimit={setLimit}
        isPagination={true}
      />

      <DeleteUserModal
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        user={userToDelete}
        onDelete={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}