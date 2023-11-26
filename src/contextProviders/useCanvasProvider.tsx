"use client";

import { useCanvas } from "@/hooks/useCanvas";
import React, { createContext, useContext, ReactNode } from "react";

const useCanvasContext = createContext<any>(undefined);

interface MyCustomHookProviderProps {
  children: ReactNode;
}

export const CanvasContextProvider: React.FC<MyCustomHookProviderProps> = ({
  children,
}) => {
  const CanvasInstance = useCanvas();

  return (
    <useCanvasContext.Provider value={CanvasInstance}>
      {children}
    </useCanvasContext.Provider>
  );
};

export const useCanvasContextProvider = (): any => {
  const contextValue = useContext(useCanvasContext);
  if (!contextValue) {
    throw new Error(
      "useMyCustomHookContext must be used within a MyCustomHookProvider"
    );
  }
  return contextValue;
};
