// import React from 'react';
// import  '../styles/Alert.css';

// const Alerts = () => {
//   const alerts = [
//     { type: 'Low Stock', message: 'Ibuprofen - Only 5 units left' },
//     { type: 'Expiry', message: 'Vitamin D - Expiring soon' },
//   ];

//   return (
//     <div className>
//       <h2>Stock & Expiry Alerts</h2>
//       <ul className>
//         {alerts.map((alert, i) => (
//           <li key={i} className>
//             <strong>{alert.type}:</strong> {alert.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Alerts;

import React, { useEffect, useState } from 'react';
// import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Alerts = () => {
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/products');
        const now = new Date();

        const expired = res.data.filter(product => new Date(product.expiry) < now);
        const lowStock = res.data.filter(product => product.stock <= 10); // Change threshold if needed

        setExpiredProducts(expired);
        setLowStockProducts(lowStock);
      } catch (err) {
        console.error('Failed to fetch products for alerts:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleSendSMS = async () => {
    try {
      const res = await axios.post('http://localhost:5001/api/alerts/sms');
      alert(res.data.message);
    } catch (err) {
      console.error('Message sending failed', err);
      alert('Failed to send alert via SMS.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Stock & Expiry Alerts</h2>
      <ul className="list-disc ml-5 space-y-2">

        {/* Low Stock Items */}
        {lowStockProducts.length > 0 ? (
          <>
            <li className="font-semibold text-yellow-700">⚠️ Low Stock:</li>
            {lowStockProducts.map(product => (
              <li key={product._id}>
                {product.name} - Only {product.stock} units left
              </li>
            ))}
          </>
        ) : (
          <li>No low stock items ✅</li>
        )}

        {/* Expired Items */}
        {expiredProducts.length > 0 ? (
          <>
            <li className="mt-4 font-semibold text-red-700">❌ Expired Products:</li>
            {expiredProducts.map(product => (
              <li key={product._id}>
                {product.name} - Expired on {new Date(product.expiry).toLocaleDateString()}
              </li>
            ))}
          </>
        ) : (
          <li>No expired products 🎉</li>
        )}
      </ul>

      <button
        onClick={handleSendSMS}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        📲 Send Alert to Phone
      </button>
    </div>
  );
};

export default Alerts;



