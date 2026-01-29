/**
 * @fileoverview Component gốc của ứng dụng React
 * @module App
 * @description Entry point của ứng dụng, render AppRoutes
 */

import React from 'react';
import AppRoutes from './routes/AppRoutes';

/**
 * Component chính của ứng dụng
 * @component
 * @returns {JSX.Element} Router của ứng dụng
 * 
 * @description
 * Component này chỉ render AppRoutes,
 * AuthProvider được wrap ở index.js
 */
function App() {
  return <AppRoutes />;
}

export default App;
