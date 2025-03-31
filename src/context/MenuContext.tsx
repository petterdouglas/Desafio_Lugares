/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode, useContext, useState } from "react";

interface MenuType {
  isActived: boolean;
  setIsActived: (value: boolean) => void;
}

const Menu = createContext<MenuType | undefined>(undefined);

export function MenuContextProvider({ children }: { children: ReactNode }) {
  const [isActived, setIsActived] = useState<boolean>(false);

  return (
    <Menu.Provider value={{ isActived, setIsActived }}>
      {children}
    </Menu.Provider>
  );
}

export function useMenuBar() {
  const context = useContext(Menu);
  if (context === undefined) {
    throw new Error("useMenuBar must be used whitin a MenuProvider");
  }
  return context;
}
