import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';

// Lazy load pages
const Users = React.lazy(() => import('./pages/Users'));
const UserDetails = React.lazy(() => import('./pages/UserDetails'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));
const AddUser = React.lazy(() => import('./pages/AddUser'));
const AddProduct = React.lazy(() => import('./pages/AddProduct'));
const EditUser = React.lazy(() => import('./pages/EditUser'));
const EditProduct = React.lazy(() => import('./pages/EditProduct'));

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <React.Suspense
            fallback={
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<Users />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserDetails />} />
              <Route path="/users/:id/edit" element={<EditUser />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/products/:id/edit" element={<EditProduct />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/add-product" element={<AddProduct />} />
            </Routes>
          </React.Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;