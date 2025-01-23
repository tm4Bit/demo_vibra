import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";
import { InputError } from "../../InputError";
import data from "@/models/formData.json";

import styles from "@/app/styles/components/dialog/styles.module.css";

// This is a workaround to avoid TS error when importing JSON files
const professions = data.professions as [string, ...string[]]; 

const IncomeInformationSchema = z.object({
  incomeEmissionDate: z
    .string()
    .date("Informe uma data válida!")
    .refine(
      (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate <= today;
      },
      {
        message: "Data inválida.",
      }
    ),
  startOcupationDate: z
    .string()
    .date("Informe uma data válida!")
    .refine(
      (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        return selectedDate <= today;
      },
      {
        message: "Data inválida.",
      }
    ),
  profession: z.enum(
    professions,
    {
      errorMap: (issue, ctx) => {
        if (issue.code === "invalid_enum_value")
          return { message: "Selecione uma opção válida!" };
        return { message: "Selecione uma profissão!" };
      },
    }
  ),
  origin: z.enum(
    ["Assalariado", "CLT", "Rendimentos", "Profissional autônomo", "MEI"],
    {
      errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
        if (issue.code === "invalid_enum_value")
          return { message: "Selecione uma opção válida!" };
        return { message: "Selecione a origem da renda!" };
      },
    }
  ),
});

export type IncomeInformationFormData = z.infer<typeof IncomeInformationSchema>;

export const IncomeInformationDialog: React.FC = () => {
  const { updateFormData, getApplicationId } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IncomeInformationFormData>({
    resolver: zodResolver(IncomeInformationSchema),
  });
  const router = useRouter();
  const handleContinue = useCallback(
    async (data: IncomeInformationFormData) => {
      if (isValid) {
        try {
          await fetch("/api/order", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: getApplicationId(), incomeInfo: data }),
          });
          updateFormData({ incomeInfo: data }, "income");
          router.push("selfie");
        } catch (error) {
          console.error(error);
        }
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
          <InputError message={errors.incomeEmissionDate?.message} />
        </div>

        <div className={styles.row}>
          <label>Digite o mês e ano do início da sua atual ocupação</label>
          <input type="date" {...register("startOcupationDate")} />
          <InputError message={errors.startOcupationDate?.message} />
        </div>

        <div className={styles.row}>
          <label>Qual é a sua profissão?</label>
          <select {...register("profession")}>
            <option>Clique e escolha </option>
            {professions.map((profession) => (
              <option key={profession} value={profession}>
                {profession}
              </option>
            ))}
          </select>
          <InputError message={errors.profession?.message} />
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
          <InputError message={errors.origin?.message} />
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
