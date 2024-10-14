"use client";
import { createContext, useState, useContext, useEffect } from "react";

const SelectedItemsContext = createContext("selectedItems");

export const useSelectedItems = () => useContext(SelectedItemsContext);

export const SelectedItemsProvider = ({ children }: any) => {
  const [checkedItems, setCheckedItems] = useState([]);

  return (
    <SelectedItemsContext.Provider
      value={{
        checkedItems,
        setCheckedItems,
      }}
    >
      {children}
    </SelectedItemsContext.Provider>
  );
};
