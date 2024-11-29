import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { InputMask } from "@react-input/mask";
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
      `Max image size is 5MB.`
    )
    .refine(
      (file) =>
        file &&
        ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
          file[0]?.type
        ),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
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
      errorMap: (issue, _ctx) => {
        if (issue.code === "invalid_enum_value")
          return { message: "Selecione uma opção válida!" };
        return { message: "Selecione o tipo de comprovante!" };
      },
    }
  ),
  income: z.string().min(1, "Informe o seu rendimento mensal"),
});

export type IncomeMediaFormData = z.infer<typeof IncomeMediaFormSchema>;

export const DocumentMediaDialog: React.FC<Props> = ({ gotoNext }) => {
  const { updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
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
    [isValid]
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.replace(/(\d{2})$/, ",$1");
    }
    if (value.length > 5) {
      value = value.replace(/(\d{3})(?=\d{2,})/, "$1.");
    }
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
            <option value="Aviso de Crédito à Pesquisador/Bolsista">
              DECORE
            </option>
          </select>
          <InputError
            message={errors.incomeDocumentType?.message?.toString()}
          />
        </div>

        <div className={styles.row}>
          <label>Informe o seu rendimento mensal</label>
          <InputMask
            mask="R$ 999.999,99"
            replacement={{ 9: /\d/ }}
            {...register("income")}
            onChange={handleChange}
          />
          {/* <InputMask
            mask="R$ 999.999,99"
            replacement={{ 9: /\d/ }}
            {...register("income")}
          /> */}
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
