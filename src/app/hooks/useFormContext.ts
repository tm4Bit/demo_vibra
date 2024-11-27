import { useContext } from "react";
import { FormContext } from "../context/formContext";

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === null) {
    throw new Error("useFormContext must be used within a Provider");
  }
  return context;
};
