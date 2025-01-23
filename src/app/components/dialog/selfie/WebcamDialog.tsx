import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { FaCamera } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { FaArrowRotateLeft } from "react-icons/fa6";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

export const WebcamDialog: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [image, setImage] = useState<string | null>(null);
  const { formData, updateFormData, getApplicationId } = useFormContext();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc !== undefined) {
      setImage(imageSrc);
      if (imageSrc) {
        updateFormData({ selfieMedia: imageSrc }, "selfie");
      } else {
        console.error("imageSrc is null or undefined");
      }
    }
  }, [webcamRef]);

  const retry = useCallback(() => {
    setImage(null);
  }, []);

  const handleContinue = useCallback(async () => {
    console.log("image: ", image);
    if (!image) {
      console.error("No image to submit");
      return;
    }
    await fetch("/api/order", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: getApplicationId(),
        selfie: { id: getApplicationId(), selfieMedia: image },
      }),
    });
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
            <span>Capturar</span>
          </button>
          <button onClick={retry} className={styles.retryButton}>
            {/* <FaBackspace /> */}
            <FaArrowRotateLeft />
            <span>novamente</span>
          </button>
          <button onClick={handleContinue} className={styles.submitButton}>
            <BsFillSendFill />
            <span>Submeter</span>
          </button>
        </div>
      </div>
    </CustomDialog>
  );
};
