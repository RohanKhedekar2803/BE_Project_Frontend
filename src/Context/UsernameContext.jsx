import React, { createContext, useState } from "react";

export const UsernameContext = createContext(null); // Default value

// Provider
export const UsernameProvider = (props) => {
  const [username, setUsername] = useState('default');
  const [nickname, setNickname] = useState('pet');

  return (
    <UsernameContext.Provider value={{ username, setUsername, nickname,setNickname }}>
      {props.children}
    </UsernameContext.Provider>
  );
};
