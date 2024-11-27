"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomDialog } from "./dialog/Dialog";
import { MdErrorOutline } from "react-icons/md";

import styles from "@/app/styles/components/dialog/declarations.module.css";

export const declarationsSchema = z.object({
  bornInBrasil: z.boolean().refine((v) => v),
  taxDomicile: z.boolean().refine((v) => v),
  responsibleForActs: z.boolean().refine((v) => v),
  politicallyExposedPerson: z.boolean().refine((v) => v),
  authorizeSCRConsultation: z.boolean().refine((v) => v),
  shareData: z.boolean().refine((v) => v),
});

type declarationData = z.infer<typeof declarationsSchema>;

export const DeclarationsDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<declarationData>({
    resolver: zodResolver(declarationsSchema),
  });
  const router = useRouter();

  const handleContinue = (_data: declarationData) => {
    if (isValid) router.push("nao_correntista");
  };

  return (
    <CustomDialog
      title="Essas declarações são importantes para emitir seu cartão:"
      triggerText="Solicitar Cartão Petrobras"
      isOpen={false}
    >
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.formRow}>
          <label htmlFor="1">Nasci no Brasil </label>
          <input
            id="1"
            type="checkbox"
            {...register("bornInBrasil", { required: true })}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="2">Tenho domicílio fiscal somente no Brasil </label>
          <input
            id="2"
            type="checkbox"
            {...register("taxDomicile", { required: true })}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="3">Sou responsável por meus atos </label>
          <input
            id="3"
            type="checkbox"
            {...register("responsibleForActs", { required: true })}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="4">Não sou pessoa politicamente exposta </label>
          <input
            id="4"
            type="checkbox"
            {...register("politicallyExposedPerson", { required: true })}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="5">Autorizo consulta ao SCR/Bacen </label>
          <input
            id="5"
            type="checkbox"
            {...register("authorizeSCRConsultation", { required: true })}
          />
        </div>
        <div className={styles.formRow}>
          <label htmlFor="6">Aceito compartilhar meus dados </label>
          <input
            id="6"
            type="checkbox"
            {...register("shareData", { required: true })}
          />
        </div>
        <div className={styles.actionContainer}>
          <button type="submit" className={styles.submitButton}>
            Continuar
          </button>
          {!isEmpty(errors) && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Marque todas as opções para prosseguir!</span>
            </span>
          )}
        </div>
      </form>
    </CustomDialog>
  );
};
