// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { User } from "../types/User";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";
import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setUsers(await getUsers());
  };

  const handleAddUser = async (data: Omit<User, "id">) => {
    await addUser({ ...data });
    await loadUsers();
  };

  const handleUpdateUser = async (data: Omit<User, "id">) => {
    if (editingUser) {
      await updateUser(editingUser.id, { ...editingUser, ...data });
      setEditingUser(null);
      await loadUsers();
    }
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    await loadUsers();
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <UserForm
        defaultValues={editingUser || undefined}
        onSubmit={editingUser ? handleUpdateUser : handleAddUser}
      />
      <UserTable
        users={users}
        onEdit={setEditingUser}
        onDelete={handleDeleteUser}
      />
    </div>
  );
};

export default Dashboard;
