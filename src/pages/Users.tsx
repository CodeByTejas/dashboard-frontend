import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { getUsers, deleteUser } from '../lib/api';
import { UserCircle, Trash2 } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = () => {
    setLoading(true);
    getUsers()
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load users');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id.toString());
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Users</h2>
        <Link
          to="/add-user"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New User
        </Link>
      </div>
      <ul className="divide-y divide-gray-200">
        {users.map(user => (
          <li key={user.id} className="hover:bg-gray-50">
            <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
              <Link to={`/users/${user.id}`} className="flex items-center flex-1">
                <UserCircle className="h-10 w-10 text-gray-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">
                    {user.name.firstname} {user.name.lastname}
                  </p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </Link>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="ml-4 p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;