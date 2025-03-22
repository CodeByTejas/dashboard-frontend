import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, ShoppingBag, Plus } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname.startsWith(path);
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 py-2 text-gray-700 hover:text-gray-900">
              <span className="text-xl font-bold">Dashboard</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <Link
                to="/users"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/users')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Users className="w-4 h-4 mr-2" />
                Users
              </Link>
              
              <Link
                to="/products"
                className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  isActive('/products')
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Products
              </Link>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <Link
              to="/add-user"
              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Link>
            
            <Link
              to="/add-product"
              className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;