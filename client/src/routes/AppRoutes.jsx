import React from 'react';
import { Routes, Route } from "react-router-dom";
import routes from './routes';
import Header from '../components/common/Header';

function AppRoutes() {
  return (
    <>
      <Header />
      <Routes>
        {routes.map((route, index) => (
          <Route 
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>
    </>
  );
}

export default AppRoutes;
