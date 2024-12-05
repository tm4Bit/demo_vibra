"use client";

import { useCallback, useState } from "react";

import { DocumentInformationDialog } from "@/app/components/dialog/identityInformation/IdentityInformationDialog";
import { DocumentMediaDialog } from "@/app/components/dialog/identityInformation/DocumentMediaDialog";
import { InstructionsDialog } from "@/app/components/dialog/identityInformation/InstructionsDialog";

import styles from "@/app/styles/pages/styles.module.css";

export const FormStepsContainer = () => {
  const [step, setStep] = useState<number>();

  const nextStep = useCallback((n: number) => {
    setStep(n);
  }, []);

  let DialogToRender;

  switch (step) {
    case 1:
      DialogToRender = <InstructionsDialog gotoNext={nextStep} />;
      break;
    case 2:
      DialogToRender = <DocumentMediaDialog />;
      break;
    default:
      DialogToRender = <DocumentInformationDialog gotoNext={nextStep} />;
      break;
  }
  return <div className={styles.actionContainer}>{DialogToRender}</div>;
};
