import React, { createContext, useEffect, useState } from "react";

type Props = { children: React.ReactNode }

type CatExists = boolean

interface CatExistsContextType {
    catExists: CatExists;
    setCatExists: React.Dispatch<React.SetStateAction<CatExists>>;
  }

export const CatExistsContext = createContext<CatExistsContextType>({
    catExists: false,
    setCatExists: () => {}
})

export const CatExistsProvider: React.FC<Props> = ({ children }) => {
    const [catExists, setCatExists] = useState<CatExists>(false)

    useEffect(() => {
        const localStorageCatExists = localStorage.getItem("catExist");
    
        if (localStorageCatExists) {
          const localCatExists: CatExists = JSON.parse(localStorageCatExists)
          setCatExists(localCatExists);
        }
      }, []);

      return (
        <CatExistsContext.Provider
          value={{
            catExists,
            setCatExists,
          }}
        >
          {children}
        </CatExistsContext.Provider>
      );
}