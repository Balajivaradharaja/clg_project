import React, { useState, useEffect } from 'react';

const EditProuctMOdel = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    expiry: ''
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        stock: product.stock,
        expiry: product.expiry?.split('T')[0]
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave({ ...product, ...formData });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-md">
        <h3 className="text-lg font-bold mb-4">Edit Product</h3>
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            className="w-full mt-1 p-2 border rounded"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-2">
          Stock:
          <input
            type="number"
            name="stock"
            className="w-full mt-1 p-2 border rounded"
            value={formData.stock}
            onChange={handleChange}
          />
        </label>
        <label className="block mb-4">
          Expiry:
          <input
            type="date"
            name="expiry"
            className="w-full mt-1 p-2 border rounded"
            value={formData.expiry}
            onChange={handleChange}
          />
        </label>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:underline">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProuctMOdel;
