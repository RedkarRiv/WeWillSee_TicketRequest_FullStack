import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Dashboard } from "../Dashboard/Dashboard";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </>
  );
};
