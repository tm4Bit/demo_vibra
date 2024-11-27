import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";
import { useForm } from "react-hook-form";
import { useFormContext } from "@/app/hooks/useFormContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdErrorOutline } from "react-icons/md";

const ResidenceInfoFormSchema = z.object({
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
  address: z.string().min(5, "Endereço inválido"),
  number: z.string().min(1, "Número inválido"),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, "Bairro inválido"),
  city: z.string().min(1, "Cidade inválida"),
  state: z.string().min(1, "Estado inválido"),
  propertySituation: z.enum(
    ["Próprio quitado", "Próprio financiado", "Alugado", "Familiar", "Cedido"],
    {
      errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
        if (issue.code === "invalid_enum_value")
          return { message: "Por favor, selecione uma opção válida." };
        return { message: "Situação da propriedade obrigatória" };
      },
    }
  ),
});

export type ResidenceInfoFormData = z.infer<typeof ResidenceInfoFormSchema>;

export const ResidenceInformationDialog: React.FC = () => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResidenceInfoFormData>({
    resolver: zodResolver(ResidenceInfoFormSchema),
  });
  const router = useRouter();
  const handleContinue = useCallback(
    (data: ResidenceInfoFormData) => {
      // NOTE: Validate form and save in localstorage
      if (isValid) {
        updateFormData({ residenceInfo: data }, "residence");
        router.push("renda");
      }
    },
    [isValid]
  );

  return (
    <CustomDialog
      title="Digite o endereço para receber o seu cartão"
      triggerText="Começar"
      isOpen={true}
    >
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Seu CEP</label>
          <input type="text" placeholder="XX.XXX-XXX" {...register("cep")} />
          {errors.cep && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.cep.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Seu endereço"
            {...register("address")}
          />
          {errors.address && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.address.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <input type="text" placeholder="Número" {...register("number")} />

          {errors.number && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.number.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Complemento"
            {...register("complement")}
          />

          {errors.complement && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.complement.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Bairro"
            {...register("neighborhood")}
          />

          {errors.neighborhood && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.neighborhood.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <input type="text" placeholder="Cidade" {...register("city")} />

          {errors.city && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.city.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <input type="text" placeholder="Estado" {...register("state")} />

          {errors.state && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.state.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <select {...register("propertySituation")}>
            <option value="">Situação da Propriedade</option>
            <option value="Próprio quitado">Próprio quitado</option>
            <option value="Próprio financiado">Próprio financiado</option>
            <option value="Alugado">Alugado</option>
            <option value="Familiar">Familiar</option>
            <option value="Cedido">Cedido</option>
          </select>
          {errors.propertySituation && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.propertySituation.message}</span>
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
