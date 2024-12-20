import React, { useState } from 'react';
import UserForm from './components/UserForm';
import EditUserForm from './components/EditUserForm';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import './styles/App.css';
import { User } from './types/User';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddUser = (user: Omit<User, 'id'>) => {
    setUsers((prev) => [...prev, { id: Date.now(), ...user }]);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedUsers = users.slice((currentPage - 1) * 5, currentPage * 5);

  return (
    <div>
      <h1>User Management Dashboard</h1>
      {editingUser ? (
        <EditUserForm
          user={editingUser}
          onSave={handleEditUser}
          onCancel={() => setEditingUser(null)}
        />
      ) : (
        <UserForm onSubmit={handleAddUser} />
      )}
      <UserTable
        users={paginatedUsers}
        onEdit={setEditingUser}
        onDelete={handleDeleteUser}
      />
      <Pagination
        total={users.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;