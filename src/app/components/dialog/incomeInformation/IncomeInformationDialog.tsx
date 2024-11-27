import { useCallback } from "react";
import { CustomDialog } from "../../dialog/Dialog";
import { z } from "zod";
import { MdErrorOutline } from "react-icons/md";

import styles from "@/app/styles/components/dialog/styles.module.css";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/app/hooks/useFormContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const IncomeInformationSchema = z.object({
  incomeEmissionDate: z.string().date("Informe uma data válida!"),
  startOcupationDate: z.string().date("Informe uma data válida!"),
  profession: z.enum(
    [
      "Agente político",
      "Aposentado ou pensionista",
      "Aprendiz",
      "Atividade sem remuneração",
      "Agrônomo",
    ],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === "invalid_enum_value") {
          return { message: "Selecione uma opção válida!" };
        }
        return { message: "Selecione uma profissão!" };
      },
    }
  ),
  origin: z.enum(
    ["Assalariado", "CLT", "Rendimentos", "Profissional autônomo", "MEI"],
    {
      errorMap: (issue, ctx) => {
        if (issue.code === "invalid_enum_value") {
          return { message: "Selecione uma opção válida!" };
        }
        return { message: "Selecione a origem da renda!" };
      },
    }
  ),
});

export type IncomeInformationFormData = z.infer<typeof IncomeInformationSchema>;

export const IncomeInformationDialog: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IncomeInformationFormData>({
    resolver: zodResolver(IncomeInformationSchema),
  });
  const router = useRouter();
  const handleContinue = useCallback(
    (data: IncomeInformationFormData) => {
      // NOTE: Validate form and save in localstorage
      // NOTE: Process form information
      if (isValid) {
        updateFormData({ incomeInfo: data }, "income");
        router.push("selfie");
      }
    },
    [isValid]
  );

  return (
    <CustomDialog title="" triggerText="Começar" isOpen={true}>
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Digite o mês e ano da emissão do comprovante de renda</label>
          <input type="date" {...register("incomeEmissionDate")} />

          {errors.incomeEmissionDate && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Informe a data de emissão do comprovante!</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Digite o mês e ano do início da sua atual ocupação</label>
          <input type="date" {...register("startOcupationDate")} />

          {errors.startOcupationDate && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Informe a data de início da sua ocupação!</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Qual é a sua profissão?</label>
          <select {...register("profession")}>
            <option>Clique e escolha </option>
            <option value="Agente político">Agente político</option>
            <option value="Aposentado ou pensionista">
              Aposentado ou pensionista
            </option>
            <option value="Aprendiz">Aprendiz</option>
            <option value="Atividade sem remuneração">
              Atividade sem remuneração
            </option>
            <option value="Agrônomo">Agrônomo</option>
          </select>

          {errors.profession && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Selecione a sua profissão!</span>
            </span>
          )}
        </div>

        <div className={styles.row}>
          <label>Selecione origem da renda</label>
          <select {...register("origin")}>
            <option>Clique e escolha </option>
            <option value="Assalariado">Assalariado</option>
            <option value="CLT">CLT</option>
            <option value="Rendimentos">Rendimentos</option>
            <option value="Profissional autônomo">Profissional autônomo</option>
            <option value="MEI">MEI</option>
          </select>

          {errors.origin && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Selecione a origem da sua renda!</span>
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
