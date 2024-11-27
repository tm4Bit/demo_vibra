"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { isEmpty } from "lodash";

import { PersonalInfoFormData } from "../components/dialog/personalInformation";
import { DigitalInfoFormData } from "../components/dialog/personalInformation/DigitalInformationDialog";
import { AdditionalInfoFormData } from "../components/dialog/personalInformation/AdditionalInformationDialog";
import { DocumentInfoFormData } from "../components/dialog/identityInformation";
import { DocumentMediaFormData } from "../components/dialog/identityInformation/DocumentMediaDialog";

interface FormData {
  personal?: {
    personalInfo?: PersonalInfoFormData;
    digitalInfo?: DigitalInfoFormData;
    additionalInfo?: AdditionalInfoFormData;
  };
  identity?: {
    documentInfo?: DocumentInfoFormData;
    documentMedia?: DocumentMediaFormData;
  };
  residence?: any;
  income?: any;
  selfie?: any;
}

export interface FormContextType {
  formData: FormData;
  updateFormData: (newData: any, key: string) => void;
  deleteFormData: () => void;
}

const FormContext = createContext({} as FormContextType);

const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({});

  // Carrega os dados do localStorage ao iniciar
  useEffect(() => {
    const storedData = localStorage.getItem("vibra_bb@formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // Salva os dados no localStorage sempre que vibra_bb@formData for atualizado
  useEffect(() => {
    localStorage.setItem("vibra_bb@formData", JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (newData: any, key: string) => {
    console.log("newData:", newData);
    console.log("formData:", formData);
    setFormData((prevData) => {
      console.log("prevData:", prevData);
      if (isEmpty(prevData)) return { [key]: newData };
      return { [key]: { ...prevData["personal"], ...newData } };
    });
  };

  const deleteFormData = () => {
    setFormData({});
    localStorage.removeItem("vibra_bb@formData");
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData, deleteFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
