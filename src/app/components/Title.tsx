"use client";

import { useStepsContext } from "@/app/hooks/useStepsContext";
import { TITLES } from "@/app/context/stepsContext";

import styles from "@/app/styles/title.module.css";

export const Title = () => {
  const { stepPosition } = useStepsContext();
  return (
    <h3 className={`${styles.title} ${styles.row}`}>{TITLES[stepPosition]}</h3>
  );
};
