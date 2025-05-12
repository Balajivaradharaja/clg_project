import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/BillingHistory.css';

const BillingHistory = () => {
  const [billingHistory, setBillingHistory] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/bills');
      setBillingHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch bills:", err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this bill?')) return;

    try {
      await axios.delete(`http://localhost:5001/api/bills/${id}`);
      alert('🗑 Bill deleted!');
      fetchBills(); // Refresh
    } catch (err) {
      console.error("Delete error:", err.message);
      alert('❌ Could not delete bill.');
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/billing/edit/${id}`;
  };

  const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  return (
    <div className="billing-history-container">
      <h1 className="page-title">📜 Billing History</h1>
      {billingHistory.length === 0 ? (
        <p className="no-data">No previous bills found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="billing-table">
            <thead>
              <tr>
                <th>Bill ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((bill) => (
                <tr key={bill._id}>
                  <td className="bill-id">{bill._id.slice(-6).toUpperCase()}</td>
                    <td className="customer-name">{bill.customerName}</td>
                  <td>{new Date(bill.date).toLocaleString()}</td>
                  <td className="amount-paid">₹{calculateTotal(bill.items)}</td>
                  <td>
                    <button className="btn update" onClick={() => handleUpdate(bill._id)}>✏️ Update</button>
                    <button className="btn delete" onClick={() => handleDelete(bill._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BillingHistory;
