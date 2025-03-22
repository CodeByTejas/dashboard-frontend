import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { User } from '../types';
import { getUser } from '../lib/api';
import { UserCircle, ArrowLeft, Pencil } from 'lucide-react';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getUser(id)
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load user details');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error || 'User not found'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/users" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </Link>
            <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
          </div>
          <Link
            to={`/users/${id}/edit`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="flex items-center mb-6">
          <UserCircle className="h-16 w-16 text-gray-400" />
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">
              {user.name.firstname} {user.name.lastname}
            </h3>
            <p className="text-sm text-gray-500">{user.username}</p>
          </div>
        </div>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="mt-1 text-sm text-gray-900">{user.phone}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default UserDetails;