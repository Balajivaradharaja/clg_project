import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/Predictions.css';

const data = [
  { name: 'Paracetamol', demand: 120 },
  { name: 'Ibuprofen', demand: 80 },
  { name: 'Vitamin C', demand: 150 },
  { name: 'Amoxicillin', demand: 60 },

  { name: 'Aspirin', demand: 90 },
  { name: 'Cetirizine', demand: 110 },
  { name: 'Omeprazole', demand: 70 },
  { name: 'Metformin', demand: 130 },
  { name: 'Simvastatin', demand: 140 },
  { name: 'Levothyroxine', demand: 100 },];

const Predictions = () => {
  return (
    <div className>
      <h2>AI-Based Demand Forecast</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="demand" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Predictions;
