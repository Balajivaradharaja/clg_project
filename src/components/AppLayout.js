// src/layouts/AppLayout.jsx
import React from 'react';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 text-xl font-semibold">
        Medical Store Dashboard
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
};

export default AppLayout;
