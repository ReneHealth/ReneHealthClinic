"use client";

import { createContext, useContext, type ReactNode } from "react";

const IntroContext = createContext(false);

export const useIntroDone = (): boolean => useContext(IntroContext);

export default function IntroProvider({ children }: { children: ReactNode }) {
  // Preloader disabled, see git history
  return <IntroContext.Provider value={true}>{children}</IntroContext.Provider>;
}
