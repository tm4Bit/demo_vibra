"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { Stepper } from "@/app/components/Stepper";
import { InstructionsDialog } from "@/app/components/dialog/residenceInformation";
import { DocumentMediaDialog } from "@/app/components/dialog/residenceInformation/DocumentMediaDialog";
import { ResidenceInformationDialog } from "@/app/components/dialog/residenceInformation/ResidenceInformationDialog";

import styles from "@/app/styles/pages/styles.module.css";

export default function ResidenceInformation() {
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
      DialogToRender = <DocumentMediaDialog gotoNext={nextStep} />;
      break;
    case 2:
      DialogToRender = <ResidenceInformationDialog />;
      break;
    default:
      DialogToRender = <InstructionsDialog gotoNext={nextStep} />;
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
        Agora precisamos das suas informações de residência
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
