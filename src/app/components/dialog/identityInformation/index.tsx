import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormContext } from "@/app/hooks/useFormContext";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

interface Props {
  gotoNext: (n: number) => void;
}

const DocumentInfoSchema = z.object({
  doc: z.enum(["RG", "CNH"], {
    errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
      if (issue.code === "invalid_enum_value")
        return { message: "Por favor, selecione uma opção válida." };
      return { message: "Tipo de documento é obrigatório" };
    },
  }),
  rgNumber: z
    .string()
    .min(7, "Número do RG deve conter pelo menos 7 dígitos.")
    .regex(/^[0-9]+$/, "Número do RG deve conter apenas números."),
  rgDate: z.string().date("Por favor, selecione uma data válida."),
  issuingBody: z.enum(["SSP", "DETRAN", "DGPC", "DIC", "GEJSP", "IFP"], {
    errorMap: (issue: z.ZodIssueOptionalMessage, _ctx: z.ErrorMapCtx) => {
      if (issue.code === "invalid_enum_value")
        return { message: "Por favor, selecione uma opção válida." };
      return { message: `${_ctx.defaultError} obrigatório` };
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
      errorMap: (issue, _ctx) => {
        if (issue.code === "invalid_enum_value")
          return { message: "Por favor, selecione uma opção válida." };
        return { message: `${_ctx.defaultError} obrigatório` };
      },
    }
  ),
});

export type DocumentInfoFormData = z.infer<typeof DocumentInfoSchema>;

export const DocumentInformationDialog: React.FC<Props> = ({ gotoNext }) => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DocumentInfoFormData>({
    resolver: zodResolver(DocumentInfoSchema),
  });
  const handleContinue = useCallback(
    (data: DocumentInfoFormData) => {
      // NOTE: Validate form and save in localstorage
      if (isValid) {
        updateFormData({ documentInfo: data }, "identity");
        gotoNext(1);
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
            <input
              id="rg"
              type="radio"
              value="RG"
              {...register("doc", { required: true })}
            />
          </div>
          <div>
            <label htmlFor="cnh">CNH</label>
            <input
              id="cnh"
              value="CNH"
              type="radio"
              {...register("doc", { required: true })}
            />
          </div>
          {errors.doc && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.doc.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Digite o número do RG</label>
          <input type="text" {...register("rgNumber", { required: true })} />
          {errors.rgNumber && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.rgNumber.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Data de emissão do RG</label>
          <input type="date" {...register("rgDate", { required: true })} />
          {errors.rgDate && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.rgDate.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Orgão emissor</label>
          <select {...register("issuingBody", { required: true })}>
            <option value="">Clique e escolha</option>
            <option value="SSP">SSP</option>
            <option value="DETRAN">DETRAN</option>
            <option value="DGPC">DGPC</option>
            <option value="DIC">DIC</option>
            <option value="GEJSP">GEJSP</option>
            <option value="IFP">IFP</option>
          </select>
          {errors.issuingBody && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.issuingBody.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>UF de emissão</label>
          <select {...register("issuingState", { required: true })}>
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
          {errors.issuingState && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.issuingState.message}</span>
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
