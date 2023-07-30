import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Dashboard } from "../Dashboard/Dashboard";
import { Message } from "../Message/Message";
import { MessageProvider } from "../../services/messageContext";

export const Body = () => {
  return (
    <>
    <MessageProvider>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/m" element={<Message />} />
      </Routes>
    </MessageProvider>
    </>
  );
};
