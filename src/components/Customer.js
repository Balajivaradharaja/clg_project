// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/Customer.css';

// const Customers = () => {
//   const [customers, setCustomers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  

//   useEffect(() => {
//     axios.get('http://localhost:5001/api/customers')
//       .then(res => setCustomers(res.data))
//       .catch(err => console.error('Failed to fetch customers:', err));
//   }, []);

//   return (
//     <div className="customer-container">
//       <h2>Customer Profiles</h2>
//       <ul className="customer-list">
//         {customers.map((customer, index) => (
//           <li key={index} className="customer-item">
//             {/* <p>Purcahsing History</p> */}
//                  <strong>{customer.name}</strong>
                 
//             <p>Phone: {customer.phone}</p>
//             {/* <p>Purchase History: {Array.isArray(customer.history) ? customer.history.join(', ') : 'No purchase history available'}</p> */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Customers;

import React, { useEffect, useState } from 'react';
import '../styles/Customer.css';

const getInitials = (name) => {
  if (!name || typeof name !== 'string') return '👤';
  const words = name.trim().split(' ');
  return words.length === 1
    ? words[0][0].toUpperCase()
    : words[0][0].toUpperCase() + words[1][0].toUpperCase();
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [expandedCard, setExpandedCard] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editedData, setEditedData] = useState({ name: '', phone: '' });

  useEffect(() => {
    fetch('http://localhost:5001/api/customers')
      .then((res) => res.json())
      .then((data) => setCustomers(data))
      .catch((err) => console.error('Error fetching customers:', err));
  }, []);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/customers/${id}`, {
        method: 'DELETE',
      });
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const startEdit = (customer) => {
    setEditingId(customer._id);
    setEditedData({ name: customer.name, phone: customer.phone });
  };

  const handleEditChange = (e) => {
    setEditedData({ ...editedData, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/customers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedData),
      });
      const updated = await res.json();
      setCustomers(customers.map((c) => (c._id === id ? updated : c)));
      setEditingId(null);
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="customers-wrapper">
      <h2>Customer Profiles</h2>
      <div className="card-grid">
        {customers.map((c) => (
          <div
            key={c._id}
            className={`customer-card2 ${expandedCard === c._id ? 'expanded' : ''}`}
            onClick={() => toggleExpand(c._id)}
          >
            <div className="avatar2">{getInitials(c.name)}</div>
            <div>
              {editingId === c._id ? (
                <>
                  <input
                    name="name"
                    value={editedData.name}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <input
                    name="phone"
                    value={editedData.phone}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                </>
              ) : (
                <>
                  <h3>{c.name}</h3>
                  <p>{c.phone}</p>
                  <p>{c.email}</p>
                  <p>{c.address}</p>
                </>
              )}

              {expandedCard === c._id && (
                <div className="expanded-section">
                  <h4>Purchase History</h4>
                  {c.purchaseHistory && c.purchaseHistory.length > 0 ? (
                    c.purchaseHistory.map((invoice, index) => (
                      <div key={index} className="invoice-block">
                        <p><strong>Date:</strong> {new Date(invoice.date).toLocaleString()}</p>
                        <table className="invoice-table">
                          <thead>
                            <tr>
                              <th>Medicine</th>
                              <th>Qty</th>
                              <th>Price</th>
                              <th>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {invoice.items.map((item, i) => (
                              <tr key={i}>
                                <td>{item.medicine}</td>
                                <td>{item.quantity}</td>
                                <td>₹{item.price}</td>
                                <td>₹{item.quantity * item.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p><strong>Total:</strong> ₹{invoice.total}</p>
                        <hr />
                      </div>
                    ))
                  ) : (
                    <p>No invoices found.</p>
                  )}

                  <div className="action-buttons">
                    {editingId === c._id ? (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); handleSave(c._id); }}>Save</button>
                        <button onClick={(e) => { e.stopPropagation(); setEditingId(null); }}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); startEdit(c); }}>Edit</button>
                        <button onClick={(e) => { e.stopPropagation(); handleDelete(c._id); }}>Delete</button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
