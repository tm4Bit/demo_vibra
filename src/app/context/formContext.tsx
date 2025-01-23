"use client";

import React, { createContext, useState, useEffect } from "react";
import { isEmpty } from "lodash";

// Personal Information
import { PersonalInfoFormData } from "../components/dialog/personalInformation/PersonalInformationDialog";
import { DigitalInfoFormData } from "../components/dialog/personalInformation/DigitalInformationDialog";
import { AdditionalInfoFormData } from "../components/dialog/personalInformation/AdditionalInformationDialog";
// Identity Information
import { IdentityInfoFormData } from "../components/dialog/identityInformation/IdentityInformationDialog";
import { IdentityMediaFormData } from "../components/dialog/identityInformation/DocumentMediaDialog";
// Residence Information
import { ResidenceInfoFormData } from "../components/dialog/residenceInformation/ResidenceInformationDialog";
import { ResidenceMediaFormData } from "../components/dialog/residenceInformation/DocumentMediaDialog";
// Income Information
import { IncomeInformationFormData } from "../components/dialog/incomeInformation/IncomeInformationDialog";
import { IncomeMediaFormData } from "../components/dialog/incomeInformation/DocumentMediaDialog";

interface FormData {
  declaration?: {
    bornInBrasil: boolean;
    taxDomicile: boolean;
    responsibleForActs: boolean;
    politicallyExposedPerson: boolean;
    authorizeSCRConsultation: boolean;
    shareData: boolean;
  };
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
  selfie?: {
    selfieMedia?: string;
  };
}

export interface FormContextType {
  formData: FormData;
  updateFormData: (
    newData: any,
    key: "declaration" | "personal" | "identity" | "residence" | "income" | "selfie",
  ) => void;
  deleteFormData: () => void;
  saveApplicationId: (id: number) => void;
  getApplicationId: () => number | undefined;
}

const FormContext = createContext({} as FormContextType);

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>({});
  const [applicationId, setApplicationId] = useState<number | undefined>();

  // load data from localStorage on start
  useEffect(() => {
    const storedData = localStorage.getItem("vibra_bb@formData");
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  // save data to localStorage whenever vibra_bb@formData is updated
  useEffect(() => {
    localStorage.setItem("vibra_bb@formData", JSON.stringify(formData));
    localStorage.setItem("vibra_bb@applicationId", JSON.stringify(applicationId));
  }, [formData, applicationId]);

  const _getLocalStorage = (): FormData | null => {
    const storedData = localStorage.getItem("vibra_bb@formData");
    return storedData ? JSON.parse(storedData) : null;
  };

  const updateFormData = (
    newData: any,
    key: "declaration" | "personal" | "identity" | "residence" | "income" | "selfie",
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

  const saveApplicationId = (id: number) => {
    setApplicationId(id);
  }

  const getApplicationId = () => {
    return applicationId;
  }

  return (
    <FormContext.Provider value={{ formData, updateFormData, deleteFormData, saveApplicationId, getApplicationId }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
