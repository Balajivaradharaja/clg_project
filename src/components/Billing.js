// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import '../styles/Billing.css';

// // const Billing = () => {
// //   const [customerName, setCustomerName] = useState('');
// //   const [billItems, setBillItems] = useState([
// //     { name: '', qty: 1, price: 0 },
// //   ]);
// //   const [savedBill, setSavedBill] = useState(null);

// //   const handleItemChange = (index, field, value) => {
// //     const updatedItems = [...billItems];
// //     updatedItems[index][field] = field === 'qty' || field === 'price' ? Number(value) : value;
// //     setBillItems(updatedItems);
// //   };

// //   const handleAddItem = () => {
// //     setBillItems([...billItems, { name: '', qty: 1, price: 0 }]);
// //   };

// //   const handleRemoveItem = (index) => {
// //     const updatedItems = billItems.filter((_, i) => i !== index);
// //     setBillItems(updatedItems);
// //   };

// //   const total = billItems.reduce((acc, item) => acc + item.qty * item.price, 0);

// //   const handlePrint = async () => {
// //     try {
// //       const response = await axios.post('http://localhost:5001/api/billing', {
// //         customerName,
// //         items: billItems,
// //       });
// //       setSavedBill(response.data);
// //     } catch (error) {
// //       alert('❌ Error saving bill.');
// //     }
// //   };

// //   return (
// //     <div className="billing-container">
// //       <h2>Billing System</h2>

// //       <div className="input-group">
// //         <label><strong>Customer Name:</strong></label>
// //         <input
// //           type="text"
// //           value={customerName}
// //           onChange={(e) => setCustomerName(e.target.value)}
// //           placeholder="Enter customer name"
// //         />
// //       </div>

// //       <table className="billing-table">
// //         <thead>
// //           <tr>
// //             <th>Medicine</th>
// //             <th>Qty</th>
// //             <th>Price</th>
// //             <th>Subtotal</th>
// //             <th>Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {billItems.map((item, index) => (
// //             <tr key={index}>
// //               <td>
// //                 <input
// //                   type="text"
// //                   value={item.name}
// //                   onChange={(e) => handleItemChange(index, 'name', e.target.value)}
// //                   placeholder="Medicine name"
// //                 />
// //               </td>
// //               <td>
// //                 <input
// //                   type="number"
// //                   value={item.qty}
// //                   onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
// //                   min="1"
// //                 />
// //               </td>
// //               <td>
// //                 <input
// //                   type="number"
// //                   value={item.price}
// //                   onChange={(e) => handleItemChange(index, 'price', e.target.value)}
// //                   min="0"
// //                 />
// //               </td>
// //               <td>₹{item.qty * item.price}</td>
// //               <td>
// //                 <button onClick={() => handleRemoveItem(index)}>🗑️</button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <button onClick={handleAddItem}>➕ Add Item</button>
// //       <h3>Total: ₹{total}</h3>
// //       <button onClick={handlePrint}>Print Invoice</button>

// //       {savedBill && (
// //         <div className="saved-bill">
// //           <h3>🧾 Bill Saved Successfully!</h3>
// //           <p><strong>Customer:</strong> {savedBill.customerName}</p>
// //           <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
// //           {/* <p><strong>Total Amount:</strong> ₹{savedBill.totalAmount}</p> */}
// //           <h4>Items:</h4>
// //           <ul>
// //             {savedBill.items.map((item, index) => (
// //               <li key={index}>
// //                 {item.name} - Qty: {item.qty}, Price: ₹{item.price}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Billing;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../styles/Billing.css';
// import useVoiceInput from './useVoiceInput';


// const Billing = () => {
//   const [customerName, setCustomerName] = useState('');
//   const [billItems, setBillItems] = useState([{ name: '', qty: 1, price: 0 }]);
//   const [savedBill, setSavedBill] = useState(null);

//   const { fields, startListening, listening,stopListening } = useVoiceInput();

//   useEffect(() => {
//     if (fields.customerName) setCustomerName(fields.customerName);
//     if (fields.medicineName || fields.quantity || fields.price) {
//       setBillItems((prev) => {
//         const updated = [...prev];
//         updated[updated.length - 1] = {
//           name: fields.medicineName || updated[updated.length - 1].name,
//           qty: fields.quantity || updated[updated.length - 1].qty,
//           price: fields.price || updated[updated.length - 1].price,
//         };
//         return updated;
//       });
//     }
//   }, [fields]);

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...billItems];
//     updatedItems[index][field] = field === 'qty' || field === 'price' ? Number(value) : value;
//     setBillItems(updatedItems);
//   };

//   const handleAddItem = () => {
//     setBillItems([...billItems, { name: '', qty: 1, price: 0 }]);
//   };

//   const handleRemoveItem = (index) => {
//     const updatedItems = billItems.filter((_, i) => i !== index);
//     setBillItems(updatedItems);
//   };

//   const total = billItems.reduce((acc, item) => acc + item.qty * item.price, 0);

//   const handlePrint = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/api/billing', {
//         customerName,
//         items: billItems,
//       });
//       setSavedBill(response.data);
//     } catch (error) {
//       alert('❌ Error saving bill.');
//     }
//   };

//   return (
//     <div className="billing-container">
//       <h2>Billing System</h2>

//       <div className="input-group">
//         <label><strong>Customer Name:</strong></label>
//         <input
//           type="text"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           placeholder="Enter customer name"
//         />
//         <button onClick={startListening}>
//           🎤 {listening ? 'Listening...' : 'Start Voice Input'}
          
//         </button>
//         <button onClick={stopListening}>
//           🛑 {listening?'Stop Listening':"Stop"}
//           </button>
//       </div>

//       <table className="billing-table">
//         <thead>
//           <tr>
//             <th>Medicine</th>
//             <th>Qty</th>
//             <th>Price</th>
//             <th>Subtotal</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {billItems.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <input
//                   type="text"
//                   value={item.name}
//                   onChange={(e) => handleItemChange(index, 'name', e.target.value)}
//                   placeholder="Medicine name"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.qty}
//                   onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
//                   min="1"
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.price}
//                   onChange={(e) => handleItemChange(index, 'price', e.target.value)}
//                   min="0"
//                 />
//               </td>
//               <td>₹{item.qty * item.price}</td>
//               <td>
//                 <button onClick={() => handleRemoveItem(index)}>🗑️</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button onClick={handleAddItem}>➕ Add Item</button>
//       <h3>Total: ₹{total}</h3>
//       <button onClick={handlePrint}>Print Invoice</button>

//       {savedBill && (
//         <div className="saved-bill">
//           <h3>🧾 Bill Saved Successfully!</h3>
//           <p><strong>Customer:</strong> {savedBill.customerName}</p>
//           <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
//           <h4>Items:</h4>
//           <ul>
//             {savedBill.items.map((item, index) => (
//               <li key={index}>
//                 {item.name} - Qty: {item.qty}, Price: ₹{item.price}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Billing;





// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { useReactToPrint } from 'react-to-print';
// import '../styles/Billing.css';
// import useVoiceInput from './useVoiceInput';

// const Billing = () => {
//   const [customerName, setCustomerName] = useState('');
//   const [billItems, setBillItems] = useState([{ name: '', qty: 1, price: 0 }]);
//   const [savedBill, setSavedBill] = useState(null);

//   const { fields, startListening, listening, stopListening } = useVoiceInput();

//   useEffect(() => {
//     if (fields.customerName) setCustomerName(fields.customerName);
//     if (fields.medicineName || fields.quantity || fields.price) {
//       setBillItems((prev) => {
//         const updated = [...prev];
//         updated[updated.length - 1] = {
//           name: fields.medicineName || updated[updated.length - 1].name,
//           qty: fields.quantity || updated[updated.length - 1].qty,
//           price: fields.price || updated[updated.length - 1].price,
//         };
//         return updated;
//       });
//     }
//   }, [fields]);

//   const handleItemChange = (index, field, value) => {
//     const updated = [...billItems];
//     updated[index][field] = field === 'qty' || field === 'price' ? Number(value) : value;
//     setBillItems(updated);
//   };

//   const handleAddItem = () => setBillItems([...billItems, { name: '', qty: 1, price: 0 }]);
//   const handleRemoveItem = (i) => setBillItems(billItems.filter((_, idx) => idx !== i));

//   const total = billItems.reduce((sum, { qty, price }) => sum + qty * price, 0);

//   // — Save Bill —
//   const handleSaveBill = async () => {
//     try {
//       const resp = await axios.post(
//         'http://localhost:5001/api/bills', 
//         {
//           customerName,
//           items: billItems,
//           total,                           // <-- include total now!
//         }
//       );
//       setSavedBill(resp.data);
//       alert('✅ Bill saved successfully!');
//     } catch (err) {
//       console.error('❌ Save bill error:', err.response?.data || err.message);
//       alert('❌ Error saving bill.');
//     }
//   };

//   // — Print Bill —
//   const printRef = useRef();
//   const handlePrint = useReactToPrint({ content: () => printRef.current });

//   return (
//     <div className="billing-container">
//       <h2>Billing System</h2>
//       <div className="input-group">
//         <label><strong>Customer Name:</strong></label>
//         <input
//           type="text"
//           value={customerName}
//           onChange={(e) => setCustomerName(e.target.value)}
//           placeholder="Enter customer name"
//         />
//         <button onClick={startListening}>🎤 {listening ? 'Listening...' : 'Start Voice'}</button>
//         <button onClick={stopListening}>🛑 Stop</button>
//       </div>

//       <table className="billing-table">
//         <thead>
//           <tr>
//             <th>Medicine</th><th>Qty</th><th>Price</th><th>Subtotal</th><th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {billItems.map((item, i) => (
//             <tr key={i}>
//               <td>
//                 <input
//                   type="text"
//                   value={item.name}
//                   onChange={(e) => handleItemChange(i, 'name', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.qty}
//                   onChange={(e) => handleItemChange(i, 'qty', e.target.value)}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="number"
//                   value={item.price}
//                   onChange={(e) => handleItemChange(i, 'price', e.target.value)}
//                 />
//               </td>
//               <td>₹{item.qty * item.price}</td>
//               <td>
//                 <button onClick={() => handleRemoveItem(i)}>🗑️</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button onClick={handleAddItem}>➕ Add Item</button>
//       <h3>Total: ₹{total}</h3>

//       <button onClick={handleSaveBill}>💾 Save</button>
//       <button onClick={handlePrint}>🖨️ Print Bill</button>

//       {/* — Hidden on screen, visible on print: */}
//       <div className="print-container" ref={printRef}>
//         <h2>🧾 Invoice</h2>
//         <p><strong>Customer:</strong> {customerName}</p>
//         <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
//         <table>
//           <thead>
//             <tr>
//               <th>Medicine</th><th>Qty</th><th>Price</th><th>Subtotal</th>
//             </tr>
//           </thead>
//           <tbody>
//             {billItems.map((item, i) => (
//               <tr key={i}>
//                 <td>{item.name}</td>
//                 <td>{item.qty}</td>
//                 <td>₹{item.price}</td>
//                 <td>₹{item.qty * item.price}</td>
//               </tr>
//             ))}
//             <tr>
//               <td colSpan="3"><strong>Total</strong></td>
//               <td><strong>₹{total}</strong></td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Billing;


// import React, { useState } from 'react';
// import axios from 'axios';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const BillingForm = () => {
//   const [customerName, setCustomerName] = useState('');
//   const [customerPhone, setCustomerPhone] = useState('');
//   const [items, setItems] = useState([{ medicine: '', quantity: 0, price: 0 }]);
//   const { transcript, resetTranscript } = useSpeechRecognition();

//   const handleVoiceInput = (field, index = null) => {
//     resetTranscript();
//     SpeechRecognition.startListening({ continuous: false });
//     setTimeout(() => {
//       SpeechRecognition.stopListening();
//       const text = transcript;
//       if (field === 'customerName') setCustomerName(text);
//       else if (field === 'customerPhone') setCustomerPhone(text);
//       else if (index !== null) {
//         setItems((prev) => {
//           const updated = [...prev];
//           updated[index][field] = field === 'quantity' || field === 'price' ? Number(text) : text;
//           return updated;
//         });
//       }
//     }, 3000);
//   };

//   const handleAddItem = () => {
//     setItems([...items, { medicine: '', quantity: 0, price: 0 }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post('http://localhost:5001/api/bills', {
//       customerName,
//       customerPhone,
//       items,
//     });
//     alert('Bill saved!');
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow space-y-4">
//       <h2 className="text-xl font-bold">Create Bill</h2>
//       <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" className="input" />
//       <button onClick={() => handleVoiceInput('customerName')}>🎤</button>

//       <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Phone Number" className="input" />
//       <button onClick={() => handleVoiceInput('customerPhone')}>🎤</button>

//       {items.map((item, i) => (
//         <div key={i} className="border p-2 rounded space-y-2">
//           <input value={item.medicine} onChange={(e) => {
//             const updated = [...items]; updated[i].medicine = e.target.value; setItems(updated);
//           }} placeholder="Medicine" className="input" />
//           <button onClick={() => handleVoiceInput('medicine', i)}>🎤</button>

//           <input type="number" value={item.quantity} onChange={(e) => {
//             const updated = [...items]; updated[i].quantity = Number(e.target.value); setItems(updated);
//           }} placeholder="Quantity" className="input" />
//           <button onClick={() => handleVoiceInput('quantity', i)}>🎤</button>

//           <input type="number" value={item.price} onChange={(e) => {
//             const updated = [...items]; updated[i].price = Number(e.target.value); setItems(updated);
//           }} placeholder="Price" className="input" />
//           <button onClick={() => handleVoiceInput('price', i)}>🎤</button>
//         </div>
//       ))}

//       <button onClick={handleAddItem} className="bg-blue-500 text-white px-3 py-1 rounded">+ Add Item</button>
//       <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Save Bill</button>
//     </div>
//   );
// };

// export default BillingForm;



// Billing.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import useVoiceInput from './useVoiceInput'; // Custom voice hook
import '../styles/Billing.css'; // 👈 Add the CSS file here

const Billing = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customeremail, setCustomeremail] = useState('');
  const [billItems, setBillItems] = useState([{ name: '', qty: 1, price: 0 }]);
  const [, setSavedBill] = useState(null);

  const { fields, startListening, listening, stopListening } = useVoiceInput();

  useEffect(() => {
    if (fields.customerName) setCustomerName(fields.customerName);
    if (fields.customerPhone) setCustomerPhone(fields.customerPhone);
    if (fields.customeremail) setCustomeremail(fields.customeremail);
    if (fields.medicineName || fields.quantity || fields.price) {
      setBillItems((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          name: fields.medicineName || updated[updated.length - 1].name,
          qty: fields.quantity || updated[updated.length - 1].qty,
          price: fields.price || updated[updated.length - 1].price,
        };
        return updated;
      });
    }
  }, [fields]);

  const handleItemChange = (index, field, value) => {
    const updated = [...billItems];
    updated[index][field] = field === 'qty' || field === 'price' ? Number(value) : value;
    setBillItems(updated);
  };

  const handleAddItem = () => setBillItems([...billItems, { name: '', qty: 1, price: 0 }]);
  const handleRemoveItem = (i) => setBillItems(billItems.filter((_, idx) => idx !== i));

  const total = billItems.reduce((sum, { qty, price }) => sum + qty * price, 0);

  const handleSaveBill = async () => {
    try {
      const formattedItems = billItems.map(item => ({
        medicine: item.name,
        quantity: item.qty,
        price: item.price,
      }));

      const resp = await axios.post('http://localhost:5001/api/bills', {
        customerName,
        customerPhone,
        items: formattedItems,
      });

      setSavedBill(resp.data);
      alert('✅ Bill saved successfully!');
    } catch (err) {
      console.error('❌ Save bill error:', err.response?.data || err.message);
      alert('❌ Error saving bill.');
    }
  };

  const printRef = useRef();
  const handlePrint = useReactToPrint({ content: () => printRef.current });

  return (
    <div className="billing-container">
      <h1>🧾 Billing System</h1>

      <div className="customer-info">
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer Name"
        />
        <input
          type="text"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          placeholder="Customer Phone"
        />
        <input
          type="email"
          value={customeremail}
          onChange={(e) => setCustomeremail(e.target.value)}
          placeholder="Customer Email"
        />
        <div className="voice-controls">
          <button className="start" onClick={startListening}>
            🎤 {listening ? 'Listening...' : 'Start Voice'}
          </button>
          <button className="stop" onClick={stopListening}>⏹ Stop</button>
        </div>
      </div>

      <div className="items-section">
        <table>
          <thead>
            <tr>
              <th>Medicine</th><th>Qty</th><th>Price</th><th>Subtotal</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item, i) => (
              <tr key={i}>
                <td><input value={item.name} onChange={(e) => handleItemChange(i, 'name', e.target.value)} /></td>
                <td><input type="number" value={item.qty} onChange={(e) => handleItemChange(i, 'qty', e.target.value)} /></td>
                <td><input type="number" value={item.price} onChange={(e) => handleItemChange(i, 'price', e.target.value)} /></td>
                <td>₹{item.qty * item.price}</td>
                <td><button className="delete" onClick={() => handleRemoveItem(i)}>🗑</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="add-item" onClick={handleAddItem}>+ Add Item</button>
      </div>

      <div className="totals">
        <span>Total: ₹{total}</span>
        <button className="save" onClick={handleSaveBill}>💾 Save</button>
        <button className="print" onClick={handlePrint}>🖨 Print</button>
      </div>

      <div className="invoice" ref={printRef}>
        <h2>🧾 Invoice</h2>
        <p><strong>Customer:</strong> {customerName}</p>
        <p><strong>Phone:</strong> {customerPhone}</p>
        <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr><th>Medicine</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
          </thead>
          <tbody>
            {billItems.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td>₹{item.qty * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total-invoice">Total: ₹{total}</div>
      </div>
    </div>
  );
};

export default Billing;


