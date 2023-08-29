import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthService";
import { customFetch } from "./customFetch";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      updateUserData();
    } else {
      setUserData(null);
    }
  }, [isAuthenticated]);

  const updateUserData = async () => {
    try {
      const response = await customFetch.get("/api/users/me/");
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserDataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const userData = useContext(UserDataContext);
  if (userData === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return userData;
};
