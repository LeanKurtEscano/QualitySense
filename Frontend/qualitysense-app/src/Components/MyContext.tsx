import React, { createContext, useState, useContext } from 'react';

interface userData {
  file_name: string;
  generated_at: string;
  result: string;
}

interface UserDetails {
  username: string;
  email:string
}


const MyContext = createContext<any>(null);

export const MyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [ data , setData] = useState<userData[]>([])
  const [userDetails, setUserDetails] = useState<UserDetails>({
    username: "",
    email: "",
  })
  const [result, setResult] = useState(0);

  return (
    <MyContext.Provider value={{ isAuthenticated, setIsAuthenticated, data , setData, result, setResult, userDetails, setUserDetails }}>
      {children}
    </MyContext.Provider>
  );
};


export const useMyContext = () => {
  return useContext(MyContext);
};
