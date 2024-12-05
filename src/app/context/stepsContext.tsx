"use client";

import { usePathname } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const STEPS = [
  "Informações pessoais",
  "Informações de identidade",
  "Informações residência",
  "Informações de renda",
  "Selfie",
];

export const TITLES = [
  "Vamos começar com suas informações pessoais",
  "Precisamos das suas informações de identificação",
  "Agora precisamos das suas informações de residência",
  "Precisamos das suas informações de renda",
  "Hora da selfie",
];

export interface StepsContextType {
  stepPosition: number;
  steps: string[];
}

const StepsContext = createContext({} as StepsContextType);

const StepsProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepPosition, setStepPosition] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

  const path = usePathname();
  useEffect(() => {
    try {
      const step = path?.split("/")[2]; // Handle undefined path
      if (!step) return;
      const localStorageSteps = window.localStorage.getItem("vibra_bb@steps");
      const jsonSteps = localStorageSteps ? JSON.parse(localStorageSteps) : [];

      // Fix for when the user goes back to a previous step
      if (!jsonSteps.includes(step)) {
        const newState = [...jsonSteps, step];
        window.localStorage.setItem("vibra_bb@steps", JSON.stringify(newState));
        setSteps(newState);
        setStepPosition(newState.length - 1);
      } else {
        setSteps(jsonSteps);
        setStepPosition(jsonSteps.indexOf(step));
      }
    } catch (error) {
      console.error("Error parsing localStorage steps:", error);
      setSteps([]);
      setStepPosition(0);
    }
  }, [path]);

  return (
    <StepsContext.Provider value={{ stepPosition, steps }}>
      {children}
    </StepsContext.Provider>
  );
};

export { StepsContext, StepsProvider };
