import { useContext } from "react";
import { StepsContext } from "../context/stepsContext";

export const useStepsContext = () => {
  const context = useContext(StepsContext);
  if (context === null) {
    throw new Error("useSteps must be used within a StepsProvider");
  }
  return context;
};
