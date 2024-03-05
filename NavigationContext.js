// import React, { createContext, useContext, useState } from 'react';

// const NavigationContext = createContext();

// export const useNavigationContext = () => useContext(NavigationContext);

// export const NavigationProvider = ({ children }) => {
//   const [currentTab, setCurrentTab] = useState('Trees');
//   console.log("Current Tab in Component:", currentTab);


//   return (
//     <NavigationContext.Provider value={{ currentTab, setCurrentTab }}>
//       {children}
//     </NavigationContext.Provider>
//   );
// };



// import React, { createContext, useContext, useState } from 'react';

// const NavigationContext = createContext();

// export const useNavigationContext = () => useContext(NavigationContext);

// export const NavigationProvider = ({ children }) => {
//   const [currentTab, navigateToTab] = useState('defaultTab');

//   return (
//     <NavigationContext.Provider value={{ currentTab, navigateToTab }}>
//       {children}
//     </NavigationContext.Provider>
//   );
// };

import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState('trees');
  const [selectedIndex, setSelectedIndex] = useState(0);



  const navigateToTab = (tabName) => {
    console.log("tabName", tabName); 

    
    setCurrentTab(tabName);
  };

  return (
    <NavigationContext.Provider value={{ currentTab, navigateToTab }}>
      {children}
    </NavigationContext.Provider>
  );
};
