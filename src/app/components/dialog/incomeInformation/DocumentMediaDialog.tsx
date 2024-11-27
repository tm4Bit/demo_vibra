import { useCallback } from "react";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";
import { useForm } from "react-hook-form";
import { useFormContext } from "@/app/hooks/useFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";

interface Props {
  gotoNext: (n: number) => void;
}

const DocumentMediaSchema = z.object({
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
      "Contracheque",
      "DIRF",
      "Declaração de IR",
      "Comprovante de Rendimentos Pagos",
      "Extrato INSS",
      "Aviso de Crédito à Pesquisador/Bolsista",
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

export type DocumentMediaFormData = z.infer<typeof DocumentMediaSchema>;

export const DocumentMediaDialog: React.FC<Props> = ({ gotoNext }) => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DocumentMediaFormData>({
    resolver: zodResolver(DocumentMediaSchema),
  });
  const handleContinue = useCallback(
    (data: DocumentMediaFormData) => {
      // NOTE: Validate form and save in localstorage
      if (isValid) {
        updateFormData({ documentMedia: data }, "income");
        gotoNext(2);
      }
    },
    [isValid]
  );

  return (
    <CustomDialog title="" triggerText="Começar" isOpen={true}>
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Enviar foto do comprovante de renda</label>
          <input type="file" {...register("incomeDocument")} />

          {errors.incomeDocument && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.incomeDocument?.message?.toString()}</span>
            </span>
          )}
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

          {errors.incomeDocumentType && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.incomeDocumentType.message}</span>
            </span>
          )}
        </div>

        <div className={styles.row}>
          <label>Informe o seu rendimento mensal</label>
          <input type="text" placeholder="R$" {...register("income")} />

          {errors.income && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.income.message}</span>
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
