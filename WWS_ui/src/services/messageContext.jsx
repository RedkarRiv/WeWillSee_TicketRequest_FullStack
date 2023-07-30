import React, { createContext, useState } from "react";

const MessageContext = createContext();

const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export { MessageContext, MessageProvider };