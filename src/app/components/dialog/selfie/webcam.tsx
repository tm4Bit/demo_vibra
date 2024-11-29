import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaBackspace, FaCamera } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

export const WebcamDialog: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const { formData, updateFormData } = useFormContext();

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

  const retry = useCallback(() => {
    setImage(null);
  }, []);

  const handleContinue = useCallback(() => {
    // TODO: Navigate to next step
    console.log("Form: ", JSON.stringify(formData, null, 2));
  }, []);

  return (
    <CustomDialog title="Tire uma selfie" triggerText="Começar" isOpen={true}>
      <div className={styles.webcamContainer}>
        {image ? (
          <img src={image} alt="selfie" className={styles.selfieImage} />
        ) : (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className={styles.webcam}
          />
        )}
        <div className={styles.buttonContainer}>
          <button onClick={capture} className={styles.captureButton}>
            <FaCamera />
            Capturar
          </button>
          <button onClick={retry} className={styles.retryButton}>
            <FaBackspace />
            denovo
          </button>
          <button onClick={handleContinue} className={styles.submitButton}>
            <BsFillSendFill />
            Submeter
          </button>
        </div>
      </div>
    </CustomDialog>
  );
};
