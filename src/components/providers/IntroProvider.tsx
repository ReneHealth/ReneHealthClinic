"use client";

import { createContext, useContext, type ReactNode } from "react";
// import { useCallback, useState } from "react";
// import Preloader from "@/components/Preloader";

const IntroContext = createContext(false);

export const useIntroDone = (): boolean => useContext(IntroContext);

export default function IntroProvider({ children }: { children: ReactNode }) {
  // Preloader disabled. The intro gate is held permanently open so every
  // consumer of useIntroDone() (Hero, SplitReveal, BookButton, GlobalInnerHero,
  // TeamHero, BlogHero, NotFound) runs its entrance animation immediately.
  // To restore: uncomment the import + state below and the <Preloader /> render.
  // const [done, setDone] = useState(false);
  // const handleDone = useCallback(() => setDone(true), []);
  const done = true;

  return (
    <IntroContext.Provider value={done}>
      {/* <Preloader onDone={handleDone} /> */}
      {children}
    </IntroContext.Provider>
  );
}
