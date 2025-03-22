import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { getProduct } from '../lib/api';
import { ArrowLeft, Star, Pencil } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(id)
        .then(data => {
          setProduct(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load product details');
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

  if (error || !product) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error || 'Product not found'}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/products" className="mr-4">
              <ArrowLeft className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </Link>
            <h2 className="text-xl font-semibold text-gray-900">Product Details</h2>
          </div>
          <Link
            to={`/products/${id}/edit`}
            className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="aspect-w-3 aspect-h-2 bg-gray-50">
          <img
            src={product.image}
            alt={product.title}
            className="object-contain w-full h-96 p-8"
          />
        </div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-2xl font-semibold text-gray-900">{product.title}</h3>
          <div className="mt-2 flex items-center">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="ml-1 text-sm text-gray-600">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          <p className="mt-4 text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900">Description</h4>
            <p className="mt-2 text-sm text-gray-500">{product.description}</p>
          </div>
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;