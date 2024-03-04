import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('trees');

  return (
    <NavigationContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </NavigationContext.Provider>
  );
};
