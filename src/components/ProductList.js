// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// // import './styles/ProductList.css';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5001/api/products')
//       .then(res => setProducts(res.data))
//       .catch(err => console.error('Failed to fetch products:', err));
//   }, []);

//   return (
//     <div className="product-list-container">
//       <h2 className="product-list-title">Product List</h2>
//       <ul className="product-list">
//         {products.map((product, index) => (
//           <li key={index} className="product-item">
//             <h3>{product.name}</h3>
//             <p>Price: ₹{product.price}</p>
//             <p>Quantity: {product.quantity}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ProductList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);

//   const fetchProducts = async () => {
//     const res = await axios.get('http://localhost:5001/api/products');
//     setProducts(res.data);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       <h2>Product List</h2>
//       {products.map((product, i) => (
//         <div key={i}>
//           <strong>• {product.name}</strong><br />
//           Price: ₹{product.price}<br />
//           Quantity: {product.quantity}<br /><br />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProductList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import EditProductModal from './EditProcutMOdel';
// import ConfirmDeleteModal from './confirmmodel';
// import AppLayout from './AppLayout';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStock, setFilterStock] = useState(false);
//   const [sortAsc, setSortAsc] = useState(true);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [deletingProductId, setDeletingProductId] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5001/api/products');
//       setProducts(res.data);
//       setFilteredProducts(res.data);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let data = [...products];
//     if (filterStock) data = data.filter(p => p.stock > 0);
//     setFilteredProducts(data);
//   }, [filterStock, products]);

//   const handleSort = () => {
//     const sorted = [...filteredProducts].sort((a, b) =>
//       sortAsc
//         ? new Date(a.expiry) - new Date(b.expiry)
//         : new Date(b.expiry) - new Date(a.expiry)
//     );
//     setFilteredProducts(sorted);
//     setSortAsc(!sortAsc);
//   };

//   const handleSaveEdit = async (updatedProduct) => {
//     try {
//       await axios.put(`http://localhost:5001/api/products/${updatedProduct._id}`, updatedProduct);
//       setEditingProduct(null);
//       fetchProducts();
//     } catch (err) {
//       console.error('Error updating product:', err);
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(`http://localhost:5001/api/products/${deletingProductId}`);
//       setDeletingProductId(null);
//       fetchProducts();
//     } catch (err) {
//       console.error('Error deleting product:', err);
//     }
//   };

//   return (
//     <AppLayout>
//       <div className="flex items-center gap-4 mb-6">
//         <button
//           onClick={handleSort}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Sort by Expiry ({sortAsc ? 'Asc' : 'Desc'})
//         </button>
//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={filterStock}
//             onChange={(e) => setFilterStock(e.target.checked)}
//             className="form-checkbox"
//           />
//           Show only in-stock
//         </label>
//       </div>

//       {loading ? (
//         <p className="text-gray-500 animate-pulse">Loading...</p>
//       ) : filteredProducts.length === 0 ? (
//         <p className="text-gray-600">No products available.</p>
//       ) : (
//         <div className="grid gap-4">
//           {filteredProducts.map((product) => (
//             <div key={product._id} className="bg-white rounded-xl p-5 shadow-md relative">
//               <h3 className="text-xl font-bold">{product.name}</h3>
//               <p>Stock: {product.stock}</p>
//               <p>Expiry: {new Date(product.expiry).toLocaleDateString()}</p>
//               <div className="absolute top-4 right-4 flex gap-3">
//                 <button
//                   onClick={() => setEditingProduct(product)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => setDeletingProductId(product._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {editingProduct && (
//         <EditProductModal
//           product={editingProduct}
//           onClose={() => setEditingProduct(null)}
//           onSave={handleSaveEdit}
//         />
//       )}

//       {deletingProductId && (
//         <ConfirmDeleteModal
//           onConfirm={handleDeleteConfirm}
//           onCancel={() => setDeletingProductId(null)}
//         />
//       )}
//     </AppLayout>
//   );
// };

// export default ProductList;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import EditProductModal from './EditProcutMOdel';
// import ConfirmDeleteModal from './confirmmodel';
// import AppLayout from './AppLayout';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filterStock, setFilterStock] = useState(false);
//   const [showExpired, setShowExpired] = useState(false);
//   const [sortAsc, setSortAsc] = useState(true);
//   const [editingProduct, setEditingProduct] = useState(null);
//   const [deletingProductId, setDeletingProductId] = useState(null);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get('http://localhost:5001/api/products');
//       setProducts(res.data);
//       setFilteredProducts(res.data);
//     } catch (error) {
//       console.error('Failed to fetch products:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let data = [...products];
//     if (filterStock) data = data.filter(p => p.stock > 0);
//     if (showExpired) data = data.filter(p => new Date(p.expiry) < new Date());
//     setFilteredProducts(data);
//   }, [filterStock, showExpired, products]);

//   const handleSort = () => {
//     const sorted = [...filteredProducts].sort((a, b) =>
//       sortAsc
//         ? new Date(a.expiry) - new Date(b.expiry)
//         : new Date(b.expiry) - new Date(a.expiry)
//     );
//     setFilteredProducts(sorted);
//     setSortAsc(!sortAsc);
//   };

//   const handleSaveEdit = (updatedProduct) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product._id === updatedProduct._id ? updatedProduct : product
//       )
//     );
//     setEditingProduct(null);
//   };

//       const handleDeleteConfirm = () => {
//         setProducts((prevProducts) =>
//           prevProducts.filter((product) => product._id !== deletingProductId)
//         );
//         setDeletingProductId(null);
//       };

//   return (
//     <AppLayout>
//       <div className="flex items-center gap-4 mb-6 flex-wrap">
//         <button
//           onClick={handleSort}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//         >
//           Sort by Expiry ({sortAsc ? 'Asc' : 'Desc'})
//         </button>

//         <label className="flex items-center gap-2">
//           <input
//             type="checkbox"
//             checked={filterStock}
//             onChange={(e) => setFilterStock(e.target.checked)}
//             className="form-checkbox"
//           />
//           Show only in-stock
//         </label>

//         <button
//           onClick={() => setShowExpired(prev => !prev)}
//           className={`px-4 py-2 rounded-lg ${
//             showExpired ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-800'
//           }`}
//         >
//           {showExpired ? 'Showing Expired' : 'Check Expired'}
//         </button>
//       </div>

//       {loading ? (
//         <p className="text-gray-500 animate-pulse">Loading...</p>
//       ) : filteredProducts.length === 0 ? (
//         <p className="text-gray-600">No products available.</p>
//       ) : (
//         <div className="grid gap-4">
//           {filteredProducts.map((product) => (
//             <div
//               key={product._id}
//               className={`rounded-xl p-5 shadow-md relative ${
//                 new Date(product.expiry) < new Date()
//                   ? 'bg-red-100 border border-red-400'
//                   : 'bg-white'
//               }`}
//             >
//               <h3 className="text-xl font-bold">{product.name}</h3>
//               <p>Stock: {product.stock}</p>
//               <p>Expiry: {new Date(product.expiry).toLocaleDateString()}</p>
//               <div className="absolute top-4 right-4 flex gap-3">
//                 <button
//                   onClick={() => setEditingProduct(product)}
//                   className="text-blue-600 hover:underline"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => setDeletingProductId(product._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {editingProduct && (
//         <EditProductModal
//           product={editingProduct}
//           onClose={() => setEditingProduct(null)}
//           onSave={handleSaveEdit}
//         />
//       )}

//       {deletingProductId && (
//         <ConfirmDeleteModal
//           onConfirm={handleDeleteConfirm}
//           onCancel={() => setDeletingProductId(null)}
//         />
//       )}
//     </AppLayout>
//   );
// };

// export default ProductList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditProductModal from './EditProcutMOdel';
import ConfirmDeleteModal from './confirmmodel';
import AppLayout from './AppLayout';
import '../styles/InventoryManagement.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProductId, setDeletingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/products');
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const results = products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/products/${deletingProductId}`);
      const updated = products.filter(p => p._id !== deletingProductId);
      setProducts(updated);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleSaveEdit = (updatedProduct) => {
    const updated = products.map(p =>
      p._id === updatedProduct._id ? updatedProduct : p
    );
    setProducts(updated);
    setEditingProduct(null);
  };

  return (
    <AppLayout>
      {/* 🔍 Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search product..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const isExpired = new Date(product.expiry) < new Date();
            const stockPercent = Math.min((product.stock / 1000) * 100, 100);

            return (
              <div
                key={product._id}
                className={`rounded-xl p-5 border shadow-md bg-white transition hover:shadow-xl ${
                  isExpired ? 'border-red-400 bg-red-50' : ''
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-blue-900 capitalize">{product.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* 📊 Stock visual meter */}
                <div className="mb-2">
                  <div className="text-sm text-gray-600">Stock: {product.stock}</div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${stockPercent}%`,
                        backgroundColor:
                          stockPercent < 30
                            ? '#f87171'
                            : stockPercent < 70
                            ? '#facc15'
                            : '#4ade80',
                      }}
                    />
                  </div>
                </div>

                <div className="text-sm text-gray-700 mb-3">
                  Expiry:{' '}
                  <span className={isExpired ? 'text-red-600 font-semibold' : ''}>
                    {new Date(product.expiry).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex justify-end gap-4 mt-3">
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingProductId(product._id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      )}
      {deletingProductId && (
        <ConfirmDeleteModal
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeletingProductId(null)}
        />
      )}
    </AppLayout>
  );
};

export default ProductList;
