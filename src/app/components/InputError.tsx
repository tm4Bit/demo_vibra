import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

import styles from "@/app/styles/components/inputError.module.css";

interface InputErrorProps {
  message?: string;
}
export const InputError: React.FC<InputErrorProps> = ({ message }) => {
  if (!message) return null;
  return (
    <span className={styles.errorContainer}>
      <FaExclamationCircle size={16} color="#ff0000" />
      <span>{message}</span>
    </span>
  );
};
