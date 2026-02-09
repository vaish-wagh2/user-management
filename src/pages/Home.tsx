import { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";
import { User } from "../types/User";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../api/userApi";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (user: User) => {
    if (editingUser) {
      await updateUser(editingUser.id!, user);
      setEditingUser(null);
    } else {
      await createUser(user);
    }
    loadUsers();
  };

  return (
    <div className="container mt-5">
      <UserList
        users={users}
        onEdit={(user: User) => {
          setEditingUser(user);
          setOpenForm(true);
        }}
        onDelete={async (id: number) => {
          await deleteUser(id);
          loadUsers();
        }}
        onCreate={() => {
          setEditingUser(null);
          setOpenForm(true);
        }}
      />

      {/* 🔑 KEY forces modal remount → clears validation */}
      <UserForm
        key={editingUser ? editingUser.id : "create"}
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingUser(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingUser}
      />
    </div>
  );
}
