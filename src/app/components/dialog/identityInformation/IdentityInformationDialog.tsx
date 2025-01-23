import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";
import { InputError } from "../../InputError";
import data from "@/models/formData.json";

import styles from "@/app/styles/components/dialog/styles.module.css";

// This is a workaround to avoid TS error when importing JSON files
const issuingBodyOptions = data.issuingBody as [string, ...string[]];

interface Props {
  gotoNext: (n: number) => void;
}

const IdentityInfoFormSchema = z.object({
  doc: z.enum(["RG", "CNH"], {
    errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
      if (issue.code === "invalid_enum_value")
        return { message: "Por favor, selecione uma opção válida." };
      return { message: "Tipo de documento é obrigatório" };
    },
  }),
  rgNumber: z.string().min(5, "Campo obrigatório."),
  rgDate: z
    .string()
    .date("Data inválida.")
    .refine((date) => {
      const today = new Date();
      const selectedDate = new Date(date);
      return selectedDate <= today;
    }, "Data inválida."),
  issuingBody: z.enum(issuingBodyOptions, {
    errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
      if (issue.code === "invalid_enum_value")
        return { message: "Opção inválida." };
      return { message: "Campo obrigatório." };
    },
  }),
  issuingState: z.enum(
    [
      "AC",
      "AL",
      "AP",
      "AM",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RS",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE",
      "TO",
    ],
    {
      errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
        if (issue.code === "invalid_enum_value")
          return { message: "Opção inválida." };
        return { message: "Campo obrigatório." };
      },
    }
  ),
});

export type IdentityInfoFormData = z.infer<typeof IdentityInfoFormSchema>;

export const DocumentInformationDialog: React.FC<Props> = ({ gotoNext }) => {
  const { updateFormData, getApplicationId } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IdentityInfoFormData>({
    resolver: zodResolver(IdentityInfoFormSchema),
  });
  const handleContinue = useCallback(
    async (data: IdentityInfoFormData) => {
      if (isValid) {
        try {
          await fetch("/api/order", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: getApplicationId(), ...data }),
          });
          updateFormData({ documentInfo: data }, "identity");
          gotoNext(1);
        } catch (error) {
          console.error("Error creating identity information.", error);
        }
      }
    },
    [isValid]
  );

  return (
    <CustomDialog
      title="Selecione o tipo de documento a enviar"
      triggerText="Começar"
      isOpen={false}
    >
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.radioRow}>
          <div>
            <label htmlFor="rg">RG</label>
            <input id="rg" type="radio" value="RG" {...register("doc")} />
          </div>
          <div>
            <label htmlFor="cnh">CNH</label>
            <input id="cnh" value="CNH" type="radio" {...register("doc")} />
          </div>
        </div>
        <InputError message={errors.doc?.message} />

        <div className={styles.rowContainer}>
          <div className={styles.row}>
            <label>Digite o número do RG</label>
            <input type="text" {...register("rgNumber")} />
            <InputError message={errors.rgNumber?.message} />
          </div>
          <div className={styles.row}>
            <label>Data de emissão do RG</label>
            <input type="date" {...register("rgDate")} />
            <InputError message={errors.rgDate?.message} />
          </div>
        </div>

        <div className={styles.rowContainer}>
          <div className={styles.row}>
            <label>Orgão emissor</label>
            <select {...register("issuingBody")}>
              <option value="">Clique e escolha</option>
              {issuingBodyOptions.map((body) => (
                <option key={body} value={body}>
                  {body}
                </option>
              ))}
            </select>
            <InputError message={errors.issuingBody?.message} />
          </div>
          <div className={styles.row}>
            <label>UF de emissão</label>
            <select {...register("issuingState")}>
              <option value="">Clique e escolha</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
            <InputError message={errors.issuingState?.message} />
          </div>
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
