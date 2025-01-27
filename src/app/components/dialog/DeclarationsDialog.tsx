"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomDialog } from "@/app/components/dialog/Dialog";
import { InputError } from "@/app/components/InputError";

import styles from "@/app/styles/components/dialog/declarations.module.css";
import { useFormContext } from "@/app/hooks/useFormContext";

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
  const { formData, updateFormData, saveApplicationId } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<declarationData>({
    resolver: zodResolver(declarationsSchema),
  });
  const router = useRouter();

  const handleContinue = useCallback((data: declarationData) => {
    if (isValid) {
			// save data to database
			// fetch("/api/order", {
			// 	method: "POST",
			// 	body: JSON.stringify(data),
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 	},
			// })
			// 	.then((res) => res.json())
			// 	.then((data) => {
      //     console.log("declaration", data);
      //     const declaration = {
      //       bornInBrasil: data.application.bornInBrasil,
      //       taxDomicile: data.application.taxDomicile,
      //       responsibleForActs: data.application.responsibleForActs,
      //       politicallyExposedPerson: data.application.politicallyExposedPerson,
      //       authorizeSCRConsultation: data.application.authorizeSCRConsultation,
      //       shareData: data.application.shareData,
      //     };

      //     saveApplicationId(data.id);

      //     updateFormData({ declaration }, "declaration");
			// 		router.push("/nao_correntista");
			// 	})
			// 	.catch((error) => {
			// 		console.error("Error:", error);
			// 	});
      router.push("/nao_correntista");
    }
  }, [isValid]);

  return (
    <CustomDialog
      title="Essas declarações são importantes para emitir seu cartão:"
      triggerText="Solicitar Cartão Petrobras"
      isOpen={false}
    >
      <form onSubmit={handleSubmit(handleContinue)}>
        {!isEmpty(errors) && (
          <InputError message="Marque todas as opções para prosseguir!" />
        )}
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
        </div>
      </form>
    </CustomDialog>
  );
};
