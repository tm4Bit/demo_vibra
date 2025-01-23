import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";
import { InputError } from "../../InputError";

import styles from "@/app/styles/components/dialog/styles.module.css";

const errorMap = (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
  if (issue.code === "invalid_enum_value")
    return { message: "Por favor, selecione uma opção válida." };
  return { message: "Campo é obrigatório" };
};

const AdditionalInfoFormSchema = z.object({
  gender: z.enum(["Feminino", "Masculino"], {
    errorMap,
  }),
  maritalStatus: z.enum(
    ["Solteiro", "Casado", "Viúvo", "Separado", "Divorciado"],
    { errorMap }
  ),
  stableUnion: z.enum(["Sim", "Não"], { errorMap }),
  levelOfEducation: z.enum(
    [
      "Analfabeto",
      "Ensino fundamental",
      "Ensino médio",
      "Superior completo",
      "Pós-graduado",
      "Mestrado",
      "Doutorado",
    ],
    { errorMap }
  ),
});

export type AdditionalInfoFormData = z.infer<typeof AdditionalInfoFormSchema>;

export const AdditionalInformationDialog: React.FC = () => {
  const { updateFormData, getApplicationId } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AdditionalInfoFormData>({
    resolver: zodResolver(AdditionalInfoFormSchema),
  });
  const router = useRouter();

  const handleContinue = useCallback(
    async (data: AdditionalInfoFormData) => {
      if (isValid) {
        // try {
        //   await fetch("/api/order", {
        //     method: "PUT",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ id: getApplicationId(), ...data }),
        //   });
        //   updateFormData({ additionalInfo: data }, "personal");
        //   router.push("identidade");
        // } catch (error) {
        //   console.error("Error creating additional information:", error);
        // }
        updateFormData({ additionalInfo: data }, "personal");
        router.push("identidade");
      }
    },
    [isValid]
  );

  return (
    <CustomDialog title="" triggerText="Começar" isOpen={true}>
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Selecione seu gênero</label>
          <select {...register("gender")}>
            <option value="">Clique e escolha</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
          </select>
          <InputError message={errors.gender?.message} />
        </div>
        <div className={styles.row}>
          <label>Qual o seu estado civil?</label>
          <select {...register("maritalStatus")}>
            <option value="">Clique e escolha</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Viúvo">Viúvo</option>
            <option value="Separado">Separado</option>
            <option value="Divorciado">Divorciado</option>
          </select>
          <InputError message={errors.maritalStatus?.message} />
        </div>
        <div className={styles.row}>
          <label>Você vive em união estável?</label>
          <select {...register("stableUnion")}>
            <option value="">Clique e escolha</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
          <InputError message={errors.stableUnion?.message} />
        </div>
        <div className={styles.row}>
          <label>Qual é o seu grau de escolaridade?</label>
          <select {...register("levelOfEducation")}>
            <option value="">Clique e escolha</option>
            <option value="Analfabeto">Analfabeto</option>
            <option value="Ensino fundamental">Ensino fundamental</option>
            <option value="Ensino médio">Ensino médio</option>
            <option value="Superior completo">Superior completo</option>
            <option value="Pós-graduado">Pós-graduado</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Doutorado">Doutorado</option>
          </select>
          <InputError message={errors.levelOfEducation?.message} />
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
