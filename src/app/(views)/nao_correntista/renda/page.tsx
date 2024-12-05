import { FormStepsContainer } from "@/app/components/dialog/incomeInformation";
import { Stepper } from "@/app/components/Stepper";
import { Title } from "@/app/components/Title";

import styles from "@/app/styles/pages/styles.module.css";

export default function ResidenceInformation() {
  return (
    <>
      <Title />
      <div className={styles.banner}>
        <img src="/img/i_card.svg" alt="" />
      </div>
      <Stepper />
      <FormStepsContainer />
    </>
  );
}
