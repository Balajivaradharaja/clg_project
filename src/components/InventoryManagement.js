// import React from 'react';

// const InventoryManagement = () => {
//   return (
//     <div className="inventory-container">
//       <h2>Inventory Management</h2>
//       <p>View and update the stock levels for all products.</p>
//     </div>
//   );
// };

// export default InventoryManagement;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../styles/InventoryManagement.css';

// const InventoryManagement = () => {
//   const [medicines, setMedicines] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5001/api/inventory')
//       .then(res => setMedicines(res.data))
//       .catch(err => console.error('Error fetching inventory:', err));
//   }, []);

//   return (
//     <div className="container">
//       <h2>Inventory Management</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Medicine</th>
//             <th>Stock</th>
//             <th>Expiry</th>
//           </tr>
//         </thead>
//         <tbody>
//           {medicines.map((med) => (
//             <tr key={med._id}>
//               <td>{med.name}</td>
//               <td>{med.stock}</td>
//               <td>{new Date(med.expiry_date).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default InventoryManagement;



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import '../styles/InventoryManagement.css';

const InventoryManagement = () => {
  const [medicines, setMedicines] = useState([]);
  const [newMed, setNewMed] = useState({ name: '', stock: '', expiry_date: '', mfg_date: '', price: '' });
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editMed, setEditMed] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5001/api/inventory')
      .then(res => setMedicines(res.data))
      .catch(err => console.error('Error fetching inventory:', err));
  }, []);

  const handleAddMedicine = () => {
    if (!newMed.name || !newMed.stock || !newMed.expiry_date || !newMed.mfg_date || !newMed.price) return;
    const newMedicine = {
      ...newMed,
      _id: Date.now(), // local ID
    };
    setMedicines([...medicines, newMedicine]);
    setNewMed({ name: '', stock: '', expiry_date: '', mfg_date: '', price: '' });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditMed({ ...medicines[index] });
  };

  const handleSave = () => {
    const updated = [...medicines];
    updated[editIndex] = editMed;
    setMedicines(updated);
    setEditIndex(null);
    setEditMed({});
  };

  const handleDelete = (id) => {
    setMedicines(medicines.filter((med) => med._id !== id));
  };

  const filteredMeds = medicines.filter((med) =>
    med.name.toLowerCase().includes(search.toLowerCase()) ||
    med.manufacturer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="inventory-layout">
      <main className="inventory-main">
        <div className="inventory-header">
          <input
            type="text"
            className="search-bar"
            placeholder="Search by name or manufacturer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="add-section">
          <input
            type="text"
            placeholder="Name"
            value={newMed.name}
            onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Stock"
            value={newMed.stock}
            onChange={(e) => setNewMed({ ...newMed, stock: e.target.value })}
          />
          <input
            type="date"
            placeholder="Expiry"
            value={newMed.expiry_date}
            onChange={(e) => setNewMed({ ...newMed, expiry_date: e.target.value })}
          />
          <input
            type="date"
            placeholder="Manufacture"
            value={newMed.mfg_date}
            onChange={(e) => setNewMed({ ...newMed, mfg_date: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={newMed.price}
            onChange={(e) => setNewMed({ ...newMed, price: e.target.value })}
          />
          <button className="add-btn" onClick={handleAddMedicine}>+ Add Medicine</button>
        </div>

        <table className="inventory-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Expiry</th>
              <th>Manufacture Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeds.map((med, index) => (
              <tr key={med._id}>
                <td>
                  {editIndex === index ? (
                    <input value={editMed.name} onChange={(e) => setEditMed({ ...editMed, name: e.target.value })} />
                  ) : (
                    med.name
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input value={editMed.stock} onChange={(e) => setEditMed({ ...editMed, stock: e.target.value })} />
                  ) : (
                    med.stock
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input type="date" value={editMed.expiry_date} onChange={(e) => setEditMed({ ...editMed, expiry_date: e.target.value })} />
                  ) : (
                    new Date(med.expiry_date).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input type="date" value={editMed.mfg_date} onChange={(e) => setEditMed({ ...editMed, mfg_date: e.target.value })} />
                  ) : (
                    new Date(med.mfg_date).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input value={editMed.price} onChange={(e) => setEditMed({ ...editMed, price: e.target.value })} />
                  ) : (
                    med.price ? `₹${parseFloat(med.price).toFixed(2)}` : '-'
                  )}
                </td>
                <td className="actions">
                  {editIndex === index ? (
                    <>
                      <button className="save" onClick={handleSave}><Save size={16} /></button>
                      <button className="cancel" onClick={() => setEditIndex(null)}><X size={16} /></button>
                    </>
                  ) : (
                    <>
                      <button className="edit" onClick={() => handleEdit(index)}><Pencil size={16} /></button>
                      <button className="delete" onClick={() => handleDelete(med._id)}><Trash2 size={16} /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default InventoryManagement;
