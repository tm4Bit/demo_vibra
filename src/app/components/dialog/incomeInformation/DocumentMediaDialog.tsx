import { useCallback, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { InputError } from "../../InputError";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

interface Props {
  gotoNext: (n: number) => void;
}

const IncomeMediaFormSchema = z.object({
  incomeDocument: z
    .any()
    .refine(
      (file) => file && file[0]?.size <= 5000000,
      "O arquivo deve ter no máximo 5MB.",
    )
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file[0]?.type,
        ),
      "O arquivo deve ser uma imagem (JPEG, JPG, PNG ou WEBP).",
    ),
  incomeDocumentType: z.enum(
    [
      "Demonstrativo de rendimentos",
      "DECORE",
      "DIRF",
      "Declaração de IR",
      "Comprovante de Rendimentos Pagos",
      "Extrato pagamento do INSS",
    ],
    {
      errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
        if (issue.code === "invalid_enum_value")
          return { message: "Selecione uma opção válida!" };
        return { message: "Selecione o tipo de comprovante!" };
      },
    },
  ),
  income: z
    .string()
    .refine(
      (value) => {
        const number = Number(value.replace(/\D/g, ""));
        return number > 0 && number <= 999999999;
      },
      { message: "Informe um valor válido!" },
    )
    .transform((value) => {
      return (Number(value.replace(/\D/g, "")) / 100).toFixed(2);
    }),
});

export type IncomeMediaFormData = z.infer<typeof IncomeMediaFormSchema>;

export const DocumentMediaDialog: React.FC<Props> = ({ gotoNext }) => {
  const [income, setIncome] = useState("R$ 0,00");
  const { updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<IncomeMediaFormData>({
    resolver: zodResolver(IncomeMediaFormSchema),
  });

  const handleContinue = useCallback(
    (data: IncomeMediaFormData) => {
      if (isValid) {
        updateFormData({ documentMedia: data }, "income");
        gotoNext(2);
      }
    },
    [isValid],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove all non-numeric characters
    const currency = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value) / 100);
    setIncome(currency);
  };

  return (
    <CustomDialog title="" triggerText="Começar" isOpen={true}>
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Enviar foto do comprovante de renda</label>
          <input type="file" {...register("incomeDocument")} />
          <InputError message={errors.incomeDocument?.message?.toString()} />
        </div>

        <div className={styles.row}>
          <label>Selecione o tipo de comprovante</label>
          <select {...register("incomeDocumentType")}>
            <option>Clique e escolha</option>
            <option value="Demonstrativo de rendimentos">
              Demonstrativo de rendimentos
            </option>
            <option value="DIRF">DIRF</option>
            <option value="Declaração de IR">Declaração de IR</option>
            <option value="Comprovante de Rendimentos Pagos">
              Comprovante de Rendimentos Pagos
            </option>
            <option value="Extrato pagamento do INSS">
              Extrato pagamento do INSS
            </option>
            <option value="DECORE">DECORE</option>
          </select>
          <InputError
            message={errors.incomeDocumentType?.message?.toString()}
          />
        </div>

        <div className={styles.row}>
          <label>Informe o seu rendimento mensal</label>
          <Controller
            control={control}
            name="income"
            render={({ field: { onChange, value, ...fields } }) => (
              <input
                {...fields}
                {...register("income")}
                value={income}
                onChange={handleChange}
              />
            )}
          />
          <InputError message={errors.income?.message?.toString()} />
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
