import { useCallback } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

interface Props {
  gotoNext: (n: number) => void;
}

const PersonalInfoFormSchema = z.object({
  birthdayDate: z.string().date(),
  fullname: z.string().min(3),
  motherName: z.string().min(3),
});

export type PersonalInfoFormData = z.infer<typeof PersonalInfoFormSchema>;

export const PersonalInformationDialog: React.FC<Props> = ({ gotoNext }) => {
  const { formData, updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(PersonalInfoFormSchema),
  });

  const handleContinue = useCallback(
    (data: PersonalInfoFormData) => {
      // TODO: Save in localstorage
      if (isValid) {
        updateFormData({ personalInfo: data }, "personal");
        gotoNext(1);
      }
    },
    [isValid]
  );

  return (
    <CustomDialog title="" triggerText="Começar" isOpen={false}>
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Informe sua data de nascimento</label>
          <input
            type="date"
            {...register("birthdayDate", { required: true })}
          />
          {errors.birthdayDate && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Informe a data de nascimento</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Seu nome completo</label>
          <input type="text" {...register("fullname", { required: true })} />

          {errors.fullname && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Informe seu nome completo!</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Informe o nome da sua mãe</label>
          <input type="text" {...register("motherName", { required: true })} />

          {errors.motherName && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>Informe o nome da sua mãe!</span>
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
