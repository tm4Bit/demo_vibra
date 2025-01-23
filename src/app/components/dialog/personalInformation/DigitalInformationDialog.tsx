import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputMask } from "@react-input/mask";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";
import { InputError } from "../../InputError";

import styles from "@/app/styles/components/dialog/styles.module.css";

interface Props {
  gotoNext: (n: number) => void;
}

const DigitalInfoFormSchema = z.object({
  phone: z
    .string()
    .regex(
      /^\(?\d{2}\)?[-.\s]?\d{4,5}[-.\s]?\d{4}$/,
      "Número de telefone inválido"
    ),
  email: z.string().email("Email inválido!"),
});

export type DigitalInfoFormData = z.infer<typeof DigitalInfoFormSchema>;

export const DigitalInfomationDialog: React.FC<Props> = ({ gotoNext }) => {
  const { updateFormData, getApplicationId } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DigitalInfoFormData>({
    resolver: zodResolver(DigitalInfoFormSchema),
  });

  const handleContinue = useCallback(
    async (data: DigitalInfoFormData) => {
      if (isValid) {
        try {
          await fetch("/api/order", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: getApplicationId(),
              ...data
            }),
          });
          updateFormData({ digitalInfo: data }, "personal");
          gotoNext(2);
        } catch (error) {
          console.error("Error creating digital information:", error);
        }
      }
    },
    [isValid]
  );

  return (
    <CustomDialog title="" triggerText="Começar" isOpen={true}>
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Informe o número do seu celular</label>
          <InputMask
            showMask
            mask="(__) _____-____"
            replacement={{ _: /\d/ }}
            {...register("phone")}
          />
          <InputError message={errors.phone?.message} />
        </div>
        <div className={styles.row}>
          <label>Informe o seu e-mail</label>
          <input
            type="text"
            placeholder="exemplo@gmail.com"
            {...register("email", { required: "Email é requerido!" })}
          />
          <InputError message={errors.email?.message} />
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
