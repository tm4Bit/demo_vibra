"use client";

import React from "react";
import { FaCheck } from "react-icons/fa6";
import { LuDot } from "react-icons/lu";

import { STEPS } from "@/app/context/stepsContext";
import { useStepsContext } from "../hooks/useStepsContext";

import styles from "@/app/styles/components/stepper.module.css";

export const Stepper: React.FC = () => {
  const { steps } = useStepsContext();

  return (
    <div className={styles.container}>
      {STEPS.map((s: string, i: number) => (
        <React.Fragment key={i}>
          <div
            key={i}
            className={`${styles.row} ${steps.length > i ? styles.active : ""}`}
          >
            <div className={styles.indicator}>
              {steps.length > i + 1 ? (
                <FaCheck size={12} />
              ) : (
                <LuDot size={12} />
              )}
            </div>
            <p>{s}</p>
          </div>
          {i < STEPS.length - 1 && <div className={styles.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
};
