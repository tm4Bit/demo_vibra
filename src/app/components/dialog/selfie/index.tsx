"use client";

import { useCallback, useState } from "react";

import { InstructionsDialog } from "@/app/components/dialog/selfie/SelfieInstructionDialog";
import { WebcamDialog } from "@/app/components/dialog/selfie/WebcamDialog";

import styles from "@/app/styles/pages/styles.module.css";

export const FormStepsContainer = () => {
  const [step, setStep] = useState<number>();

  const nextStep = useCallback((n: number) => {
    setStep(n);
  }, []);

  let dialogToRender;
  switch (step) {
    case 1:
      dialogToRender = <WebcamDialog />;
      break;
    default:
      dialogToRender = <InstructionsDialog gotoNext={nextStep} />;
  }
  return <div className={styles.actionContainer}>{dialogToRender}</div>;
};
