// import React from 'react';
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   return (
//     <div className="dashboard-wrapper">
//       <aside className="sidebar">
//         <h2>Medical Store</h2>
//         <nav>
//           <a href="/login">Login</a>
//           <a href="/dashboard">Dashboard</a>
//           <a href="/product-list">Product List</a>
//           <a href="/add-product">Add Product</a>
//           <a href="/inventory">Inventory</a>
//         </nav>
//       </aside>

//       <main className="dashboard-main">
//         <div className="dashboard-card animate-in">
//           <h1>Welcome to the Dashboard</h1>
//           <p>Manage all your medical products and inventory here.</p>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


// import React from 'react';
// import '../styles/Dashboard.css';

// const Dashboard = () => {
//   return (
//     <div className="container">
//       <h2>Dashboard Overview</h2>
//       <div className="cards">
//         <div className="card">Sales Today: ₹12,300</div>
//         <div className="card">Total Stock: 1,250 items</div>
//         <div className="card">Recent Bills: 8</div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalStock: 12210,
    totalSales: 1230,
    totalBills: 123130,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/dashboard');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
  }, []);

  const pieData = [
    { name: 'Total Stock', value: stats.totalStock },
    { name: 'Bills', value: stats.totalBills },
  ];

  const COLORS = ['#00C49F', '#FF8042'];

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2>Dashboard Overview</h2>

      <motion.div className="cards" layout transition={{ duration: 0.4 }}>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          💰 Total Sales: ₹5000
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          📦 Total Stock: 60000
        </motion.div>
        <motion.div className="card" whileHover={{ scale: 1.05 }}>
          🧾 Total Bills: 100000
        </motion.div>
      </motion.div>

      <div className="charts">
        <div className="chart-container">
          <h3>Stock vs Bills (Pie)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Analytics (Bar)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={[
              { name: 'Stock', value: stats.totalStock },
              { name: 'Sales', value: stats.totalSales },
              { name: 'Bills', value: stats.totalBills }
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

