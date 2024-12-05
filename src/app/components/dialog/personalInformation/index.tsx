"use client";

import { useCallback, useState } from "react";

import { AdditionalInformationDialog } from "@/app/components/dialog/personalInformation/AdditionalInformationDialog";
import { DigitalInfomationDialog } from "@/app/components/dialog/personalInformation/DigitalInformationDialog";
import { PersonalInformationDialog } from "@/app/components/dialog/personalInformation/PersonalInformationDialog";

import styles from "@/app/styles/pages/styles.module.css";

export const FormStepsContainer = () => {
  const [step, setStep] = useState<number>();

  const nextStep = useCallback((n: number) => {
    setStep(n);
  }, []);

  let DialogToRender;
  switch (step) {
    case 1:
      DialogToRender = <DigitalInfomationDialog gotoNext={nextStep} />;
      break;
    case 2:
      DialogToRender = <AdditionalInformationDialog />;
      break;
    default:
      DialogToRender = <PersonalInformationDialog gotoNext={nextStep} />;
      break;
  }

  return <div className={styles.actionContainer}>{DialogToRender}</div>;
};
