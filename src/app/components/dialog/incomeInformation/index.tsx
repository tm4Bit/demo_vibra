"use client";

import { useCallback, useState } from "react";

import { IncomeInformationDialog } from "@/app/components/dialog/incomeInformation/IncomeInformationDialog";
import { DocumentMediaDialog } from "@/app/components/dialog/incomeInformation/DocumentMediaDialog";
import { InstructionsDialog } from "@/app/components/dialog/incomeInformation/IncomeInstructionDialog";

import styles from "@/app/styles/pages/styles.module.css";

export const FormStepsContainer = () => {
  const [step, setStep] = useState<number>();

  const nextStep = useCallback((n: number) => {
    setStep(n);
  }, []);

  let DialogToRender;

  switch (step) {
    case 1:
      DialogToRender = <DocumentMediaDialog gotoNext={nextStep} />;
      break;
    case 2:
      DialogToRender = <IncomeInformationDialog />;
      break;
    default:
      DialogToRender = <InstructionsDialog gotoNext={nextStep} />;
      break;
  }
  return <div className={styles.actionContainer}>{DialogToRender}</div>;
};
