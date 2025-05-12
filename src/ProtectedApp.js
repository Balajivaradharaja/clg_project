// src/ProtectedApp.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaSun, FaMoon, FaMicrophone, FaCapsules, FaChartBar,
  FaUserMd, FaBell, FaReceipt
} from "react-icons/fa";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

import Dashboard from "./components/Dashboard";
import InventoryManagement from "./components/InventoryManagement";
import Billing from "./components/Billing";
import Customer from "./components/Customer";
import Alerts from "./components/Alerts";
import Predictions from "./components/Predictions";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.4s ease, color 0.4s ease;
  }

  :root {
    --card-color: ${({ theme }) => theme.card};
  }
`;

const lightTheme = {
  body: "#f9f9f9", text: "#1e1e1e", card: "#ffffff", nav: "#e8f0fe"
};

const darkTheme = {
  body: "#1e1e2f", text: "#f1f1f1", card: "#2e2e3e", nav: "#33334d"
};

const Container = styled.div` display: flex; height: 100vh; `;
const Sidebar = styled.div`
  width: 220px; background-color: ${({ theme }) => theme.nav};
  display: flex; flex-direction: column; padding: 1rem;
`;
const Content = styled.div`
  flex: 1; padding: 2rem; overflow-y: auto;
`;
const NavItem = styled.button`
  background: none; border: none; margin: 0.5rem 0; font-size: 1rem;
  display: flex; align-items: center; color: inherit; cursor: pointer;

  &:hover { color: #0077ff; }
  svg { margin-right: 0.5rem; }
`;

const ProtectedApp = () => {
  const [theme, setTheme] = useState("light");
  const [view, setView] = useState("dashboard");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const renderView = () => {
    switch (view) {
      case "dashboard": return <Dashboard />;
      case "inventory": return <InventoryManagement />;
      case "billing": return <Billing />;
      case "customers": return <Customer />;
      case "products": return <ProductList />;
      case "add-product": return <AddProduct />;
      case "alerts": return <Alerts />;
      case "predictions": return <Predictions />;
      default: return <Dashboard />;
    }
  };

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Container>
        <Sidebar>
          <NavItem onClick={() => setView("dashboard")}> <FaChartBar /> Dashboard </NavItem>
          <NavItem onClick={() => setView("inventory")}> <FaCapsules /> Inventory </NavItem>
          <NavItem onClick={() => setView("billing")}> <FaReceipt /> Billing </NavItem>
          <NavItem onClick={() => setView("products")}> <FaMicrophone /> Products </NavItem>
          <NavItem onClick={() => setView("add-product")}> <FaCapsules /> Add Product </NavItem>
          <NavItem onClick={() => setView("customers")}> <FaUserMd /> Customers </NavItem>
          <NavItem onClick={() => setView("alerts")}> <FaBell /> Alerts </NavItem>
          <NavItem onClick={() => setView("predictions")}> <FaChartBar /> AI Predictions </NavItem>
          <NavItem onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />} Theme
          </NavItem>
        </Sidebar>
        <Content>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {renderView()}
          </motion.div>
        </Content>
      </Container>
    </ThemeProvider>
  );
};

export default ProtectedApp;