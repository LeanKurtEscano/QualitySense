import React, { createContext, useState, useContext } from 'react';


const MyContext = createContext<any>(null);


export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  return useContext(MyContext);
};
