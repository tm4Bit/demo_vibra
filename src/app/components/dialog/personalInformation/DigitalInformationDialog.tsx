import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdErrorOutline } from "react-icons/md";
import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";

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
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DigitalInfoFormData>({
    resolver: zodResolver(DigitalInfoFormSchema),
  });

  const handleContinue = useCallback(
    (data: DigitalInfoFormData) => {
      // NOTE: Validate form and save in localstorage
      if (isValid) {
        updateFormData({ digitalInfo: data }, "personal");
        gotoNext(2);
      }
    },
    [isValid]
  );

  return (
    <CustomDialog title="" triggerText="Começar" isOpen={true}>
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Informe o número do seu celular</label>
          <input
            type="text"
            placeholder="(XX) 9XXXX-XXXX"
            {...register("phone", {
              required: "Número de celular é requerido!",
            })}
          />

          {errors.phone && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.phone.message}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Informe o seu e-mail</label>
          <input
            type="text"
            placeholder="exemplo@gmail.com"
            {...register("email", { required: "Email é requerido!" })}
          />
          {errors.email && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.email.message}</span>
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
