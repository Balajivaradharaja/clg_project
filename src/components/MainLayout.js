
import React from 'react';
import Navigation from './Navigation';

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <Navigation />
      <div style={{ flex: 1, padding: '20px' }}>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
