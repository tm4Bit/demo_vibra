"use client";

import { useCallback, useState } from "react";

import { DocumentMediaDialog } from "@/app/components/dialog/residenceInformation/DocumentMediaDialog";
import { ResidenceInformationDialog } from "@/app/components/dialog/residenceInformation/ResidenceInformationDialog";
import { InstructionsDialog } from "@/app/components/dialog/residenceInformation/ResidenceInstructionDialog";

import styles from "@/app/styles/pages/styles.module.css";

export const FormStepsContainer = () => {
  const [step, setStep] = useState<number>(0);

  const nextStep = useCallback((n: number) => {
    setStep(n);
  }, []);

  let DialogToRender;

  switch (step) {
    case 1:
      DialogToRender = <DocumentMediaDialog gotoNext={nextStep} />;
      break;
    case 2:
      DialogToRender = <ResidenceInformationDialog />;
      break;
    default:
      DialogToRender = <InstructionsDialog gotoNext={nextStep} />;
      break;
  }

  return <div className={styles.actionContainer}>{DialogToRender}</div>;
};
