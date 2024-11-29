"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { isEmpty } from "lodash";

import { PersonalInfoFormData } from "../components/dialog/personalInformation";
import { DigitalInfoFormData } from "../components/dialog/personalInformation/DigitalInformationDialog";
import { AdditionalInfoFormData } from "../components/dialog/personalInformation/AdditionalInformationDialog";
import { IdentityInfoFormData } from "../components/dialog/identityInformation";
import { IdentityMediaFormData } from "../components/dialog/identityInformation/DocumentMediaDialog";
import { ResidenceInfoFormData } from "../components/dialog/residenceInformation/ResidenceInformationDialog";
import { ResidenceMediaFormData } from "../components/dialog/residenceInformation/DocumentMediaDialog";
import { IncomeInformationFormData } from "../components/dialog/incomeInformation/IncomeInformationDialog";
import { IncomeMediaFormData } from "../components/dialog/incomeInformation/DocumentMediaDialog";

interface FormData {
  personal?: {
    personalInfo?: PersonalInfoFormData;
    digitalInfo?: DigitalInfoFormData;
    additionalInfo?: AdditionalInfoFormData;
  };
  identity?: {
    identityInfo?: IdentityInfoFormData;
    identityMedia?: IdentityMediaFormData;
  };
  residence?: {
    residenceInfo?: ResidenceInfoFormData;
    residenceMedia?: ResidenceMediaFormData;
  };
  income?: {
    incomeInfo?: IncomeInformationFormData;
    incomeMedia?: IncomeMediaFormData;
  };
  selfie?: any;
}

export interface FormContextType {
  formData: FormData;
  updateFormData: (
    newData: any,
    key: "personal" | "identity" | "residence" | "income" | "selfie"
  ) => void;
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

  const _getLocalStorage = (): FormData | null => {
    const storedData = localStorage.getItem("vibra_bb@formData");
    return storedData ? JSON.parse(storedData) : null;
  };

  const updateFormData = (
    newData: any,
    key: "personal" | "identity" | "residence" | "income" | "selfie"
  ) => {
    const localStorage = _getLocalStorage();
    if (localStorage) {
      setFormData((prevData) => {
        if (isEmpty(prevData)) return { ...localStorage, [key]: newData };
        return { ...localStorage, [key]: { ...prevData[key], ...newData } };
      });
    } else {
      setFormData((prevData) => {
        if (isEmpty(prevData)) return { [key]: newData };
        return { ...prevData, [key]: { ...prevData[key], ...newData } };
      });
    }
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
