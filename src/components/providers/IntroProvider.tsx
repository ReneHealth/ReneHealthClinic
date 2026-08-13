"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Preloader from "@/components/Preloader";

const IntroContext = createContext(false);

export const useIntroDone = (): boolean => useContext(IntroContext);

export default function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const handleDone = useCallback(() => setDone(true), []);

  return (
    <IntroContext.Provider value={done}>
      <Preloader onDone={handleDone} />
      {children}
    </IntroContext.Provider>
  );
}
