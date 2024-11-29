"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

import { AdditionalInformationDialog } from "@/app/components/dialog/personalInformation/AdditionalInformationDialog";
import { DigitalInfomationDialog } from "@/app/components/dialog/personalInformation/DigitalInformationDialog";
import { PersonalInformationDialog } from "@/app/components/dialog/personalInformation";
import { Stepper } from "@/app/components/Stepper";

import styles from "@/app/styles/pages/styles.module.css";

export default function PersonalInformation() {
  const [step, setStep] = useState<number>();

  const path = usePathname();
  const pathStep = useMemo(() => {
    return path.split("/")[2];
  }, [path]);

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

  return (
    <div className={styles.container}>
      {/* goback action */}
      <div className={styles.row}>
        <a href="/">
          <MdOutlineKeyboardDoubleArrowLeft size={24} />
        </a>
      </div>

      {/* title */}
      <h3 className={`${styles.title} ${styles.row}`}>
        Vamos começar com suas informações pessoais
      </h3>

      {/* banner */}
      <div className={styles.banner}>
        <img src="/img/i_card.svg" alt="" />
      </div>

      <Stepper step={pathStep} />

      {/* action btn */}
      <div className={styles.actionContainer}>{DialogToRender}</div>
    </div>
  );
}
