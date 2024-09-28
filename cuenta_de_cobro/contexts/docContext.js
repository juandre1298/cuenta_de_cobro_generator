import React, { useState, createContext, useContext } from "react";

const GeneraldocContext = createContext("");

export function useGeneraldocContext() {
  return useContext(GeneraldocContext);
}

export function GeneralDocContextProvider({ children }) {
  const [docURL, setDocURL] = useState();
  const [docList, setDocList] = useState([]);
  

  return (
    <GeneraldocContext.Provider value={{ 
      docURL, setDocURL, 
      docList, setDocList 
      }}>
      {children}
    </GeneraldocContext.Provider>
  );
}