import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useFormContext } from "@/app/hooks/useFormContext";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

export const WebcamDialog: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const { updateFormData } = useFormContext();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc !== undefined) {
      setImage(imageSrc);
      if (imageSrc) {
        updateFormData({ selfie: imageSrc }, "selfie");
      } else {
        console.error("imageSrc is null or undefined");
      }
    }
  }, [webcamRef]);

  return (
    <CustomDialog title="Tire uma selfie" triggerText="Começar" isOpen={true}>
      <div className={styles.webcamContainer}>
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className={styles.webcam}
        />
        {image ? (
          <img src={image} alt="selfie" className={styles.selfieImage} />
        ) : (
          <button onClick={capture} className={styles.captureButton}>
            Capturar
          </button>
        )}
      </div>
    </CustomDialog>
  );
};
