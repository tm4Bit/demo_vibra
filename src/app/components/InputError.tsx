import React from "react";
import { MdErrorOutline } from "react-icons/md";

import styles from "@/app/styles/components/inputError.module.css";

interface InputErrorProps {
  message?: string;
}
export const InputError: React.FC<InputErrorProps> = ({ message }) => {
  if (!message) return null;
  return (
    <span className={styles.errorContainer}>
      <MdErrorOutline size={16} color="#ff0000" />
      <span>{message}</span>
    </span>
  );
};
