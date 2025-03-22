import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { getProducts, deleteProduct, getCategories } from '../lib/api';
import { Star, Trash2 } from 'lucide-react';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()])
      .then(([productsData, categoriesData]) => {
        setProducts(productsData);
        setCategories(categoriesData);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(id.toString());
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

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
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <Link
          to="/add-product"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Product
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map(product => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200"
          >
            <div className="relative">
              <Link to={`/products/${product.id}`}>
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain w-full h-48 rounded-t-lg p-4"
                  />
                </div>
              </Link>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <Link to={`/products/${product.id}`}>
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {product.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-lg font-semibold text-gray-900">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating.rate} ({product.rating.count})
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;