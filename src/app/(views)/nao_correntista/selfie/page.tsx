"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Stepper } from "@/app/components/Stepper";

import styles from "@/app/styles/pages/styles.module.css";
import { InstructionsDialog } from "@/app/components/dialog/selfie";
import { WebcamDialog } from "@/app/components/dialog/selfie/webcam";

export default function ResidenceInformation() {
  const [step, setStep] = useState<number>();
  const path = usePathname();
  const pathStep = useMemo(() => {
    return path.split("/")[2];
  }, [path]);

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
        Precisamos de uma selfie
      </h3>

      {/* banner */}
      <div className={styles.banner}>
        <img src="/img/i_card.svg" alt="" />
      </div>

      <Stepper step={pathStep} />

      {/* action btn */}
      <div className={styles.actionContainer}>{dialogToRender}</div>
    </div>
  );
}
