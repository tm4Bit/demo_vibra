import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

const errorMap = (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
  if (issue.code === "invalid_enum_value")
    return { message: "Por favor, selecione uma opção válida." };
  return { message: `${_ctx.defaultError} obrigatório` };
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
  const { formData, updateFormData, deleteFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AdditionalInfoFormData>({
    resolver: zodResolver(AdditionalInfoFormSchema),
  });
  const router = useRouter();

  const handleContinue = useCallback(
    (data: AdditionalInfoFormData) => {
      // NOTE: Validate form and save in localstorage
      if (isValid) {
        updateFormData({ additionalInfo: data }, "personal");
        // Delete formData after requests
        deleteFormData();
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
          <select {...register("gender", { required: "Selecione uma opção!" })}>
            <option value="">Clique e escolha</option>
            <option value="Feminino">Feminino</option>
            <option value="Masculino">Masculino</option>
          </select>
          {errors.gender && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.gender.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Qual o seu estado civil?</label>
          <select
            {...register("maritalStatus", { required: "Selecione uma opção!" })}
          >
            <option value="">Clique e escolha</option>
            <option value="Solteiro">Solteiro</option>
            <option value="Casado">Casado</option>
            <option value="Viúvo">Viúvo</option>
            <option value="Separado">Separado</option>
            <option value="Divorciado">Divorciado</option>
          </select>
          {errors.maritalStatus && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.maritalStatus.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Você vive em união estável?</label>
          <select
            {...register("stableUnion", { required: "Selecione uma opção!" })}
          >
            <option value="">Clique e escolha</option>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
          {errors.stableUnion && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.stableUnion.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Qual é o seu grau de escolaridade?</label>
          <select
            {...register("levelOfEducation", {
              required: "Selecione uma opção!",
            })}
          >
            <option value="">Clique e escolha</option>
            <option value="Analfabeto">Analfabeto</option>
            <option value="Ensino fundamental">Ensino fundamental</option>
            <option value="Ensino médio">Ensino médio</option>
            <option value="Superior completo">Superior completo</option>
            <option value="Pós-graduado">Pós-graduado</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Doutorado">Doutorado</option>
          </select>
          {errors.levelOfEducation && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.levelOfEducation.message}</span>
            </span>
          )}
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
