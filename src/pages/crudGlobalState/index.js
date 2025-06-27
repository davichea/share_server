import React, { useState } from 'react';
import { create } from 'zustand';

// Zustand store inside the same file
const useUserStore = create((set, get) => ({
  users: [],

  addUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
    })),

  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...updatedUser } : user
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    })),
}));

export default function UserCrud() {
  const users = useUserStore((state) => state.users);
  const addUser = useUserStore((state) => state.addUser);
  const updateUser = useUserStore((state) => state.updateUser);
  const deleteUser = useUserStore((state) => state.deleteUser);

  const [form, setForm] = useState({ id: '', name: '', email: '' });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    if (!form.name || !form.email) return alert('Fill all fields');
    addUser({ id: Date.now(), name: form.name, email: form.email });
    setForm({ id: '', name: '', email: '' });
  };

  const handleUpdateUser = () => {
    if (!form.name || !form.email) return alert('Fill all fields');
    updateUser(form.id, { name: form.name, email: form.email });
    setForm({ id: '', name: '', email: '' });
    setEditMode(false);
  };

  const handleEditClick = (user) => {
    setForm(user);
    setEditMode(true);
  };

  const handleDeleteClick = (id) => {
    deleteUser(id);
    if (editMode && form.id === id) {
      setForm({ id: '', name: '', email: '' });
      setEditMode(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 shadow bg-gray-500 rounded mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>

      {/* Form */}
      <div className="flex flex-col space-y-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {editMode ? (
          <button
            onClick={handleUpdateUser}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 rounded transition"
          >
            Update User
          </button>
        ) : (
          <button
            onClick={handleAddUser}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
          >
            Add User
          </button>
        )}
      </div>

      {/* User List */}
      <ul>
        {users.length === 0 && (
          <li className="text-center text-white">No users added yet.</li>
        )}

        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border-b border-gray-200 py-3"
          >
            <div>
              <p className="font-medium ">{user.name}</p>
              <p className="text-sm text-gray-200">{user.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEditClick(user)}
                className="bg-yellow-300 hover:bg-yellow-400 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(user.id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
