import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext(null);

// Context Provider component
export const DataProvider = ({ children }) => {
  const [show_Sidebar, setShowSidebar] = useState(true);
  const [collapse, setSollapse] = useState(false);
  const [responseStatus, setResponeStatus] = useState('');
  const [route, setRoute] = useState('');

  return (
    <DataContext.Provider
      value={{
        collapse, setSollapse,
        show_Sidebar, setShowSidebar,
        route, setRoute,
        responseStatus, setResponeStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
