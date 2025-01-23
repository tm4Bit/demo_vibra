import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { InputMask } from "@react-input/mask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";
import { InputError } from "../../InputError";

import styles from "@/app/styles/components/dialog/styles.module.css";

const ResidenceInfoFormSchema = z.object({
  cep: z
    .string()
    .regex(/^\d{2}\.\d{3}-?\d{3}$/, "CEP inválido")
    .transform((cep: string): string => cep.replace(/\.|-/g, "")),
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
    },
  ),
});

export type ResidenceInfoFormData = z.infer<typeof ResidenceInfoFormSchema>;

export const ResidenceInformationDialog: React.FC = () => {
  const { updateFormData, getApplicationId } = useFormContext();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm<ResidenceInfoFormData>({
    resolver: zodResolver(ResidenceInfoFormSchema),
  });

  const [filled, setFilled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleContinue = useCallback(
    async (data: ResidenceInfoFormData) => {
      if (isValid) {
        try {
          await fetch("/api/order", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: getApplicationId(), residenceInfo: data }),
          });
          updateFormData({ residenceInfo: data }, "residence");
          router.push("renda");
        } catch (error) {
          console.error("Error updating form data", error);
        }
      }
    },
    [isValid],
  );

  const handleCepBlur = async () => {
    const cep = getValues("cep");
    if (!cep) return;
    const cepNumber = cep.replace(/\.|-/g, "");

    if (error !== null) setError(null);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepNumber}/json/`);
      const data = await res.json();

      const options = {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      };

      setValue("address", data.logradouro, options);
      setValue("neighborhood", data.bairro, options);
      setValue("city", data.localidade, options);
      setValue("state", data.uf, options);
    } catch (err: any) {
      setError("Um erro inesperado ocorreu tente novamente!");
    } finally {
      setFilled(true);
    }
  };

  return (
    <CustomDialog
      title="Digite o endereço para receber o seu cartão"
      triggerText="Começar"
      isOpen={true}
    >
      <form onSubmit={handleSubmit(handleContinue)}>
        <InputError message={error || undefined} />
        <div className={styles.row}>
          <InputMask
            showMask
            mask="__.___-___"
            replacement={{ _: /\d/ }}
            {...register("cep", {
              onBlur: handleCepBlur,
            })}
          />
          <InputError message={errors.cep?.message} />
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Seu endereço"
            {...register("address")}
            readOnly={filled}
          />
          <InputError message={errors.address?.message} />
        </div>

        <div className={styles.rowContainer}>
          <div className={styles.row}>
            <input type="text" placeholder="Número" {...register("number")} />
            <InputError message={errors.number?.message} />
          </div>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Complemento"
              {...register("complement")}
            />

            <InputError message={errors.complement?.message} />
          </div>
        </div>
        <div className={styles.row}>
          <input
            type="text"
            placeholder="Bairro"
            {...register("neighborhood")}
            readOnly={filled}
          />
          <InputError message={errors.neighborhood?.message} />
        </div>
        <div className={styles.rowContainer}>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Cidade"
              {...register("city")}
              readOnly={filled}
            />
            <InputError message={errors.city?.message} />
          </div>
          <div className={styles.row}>
            <input
              type="text"
              placeholder="Estado"
              {...register("state")}
              readOnly={filled}
            />
            <InputError message={errors.state?.message} />
          </div>
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
          <InputError message={errors.propertySituation?.message} />
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
