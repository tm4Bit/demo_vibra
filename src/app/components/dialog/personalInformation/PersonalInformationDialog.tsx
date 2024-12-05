import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";
import { InputError } from "../../InputError";

import styles from "@/app/styles/components/dialog/styles.module.css";

interface Props {
  gotoNext: (n: number) => void;
}

const PersonalInfoFormSchema = z.object({
  birthdayDate: z
    .string()
    .date("Selecione uma data válida.")
    .refine(
      (date) => {
        const today = new Date();
        const selectedDate = new Date(date);
        const eighteenYearsAgo = new Date();
        eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
        return selectedDate <= eighteenYearsAgo;
      },
      {
        message: "Você deve ter 18 anos ou mais.",
      }
    ),
  fullname: z
    .string()
    .min(3, "Nome completo é obrigatório.")
    .transform((name) =>
      name
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    ),
  motherName: z
    .string()
    .min(3, "Nome completo é obrigatório.")
    .transform((name) =>
      name
        .trim()
        .toLowerCase()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    ),
});

export type PersonalInfoFormData = z.infer<typeof PersonalInfoFormSchema>;

export const PersonalInformationDialog: React.FC<Props> = ({ gotoNext }) => {
  const { updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(PersonalInfoFormSchema),
  });

  const handleContinue = useCallback(
    (data: PersonalInfoFormData) => {
      if (isValid) {
        console.log(JSON.stringify(data, null, 2));
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
          <input type="date" {...register("birthdayDate")} />
          <InputError message={errors.birthdayDate?.message} />
        </div>
        <div className={styles.row}>
          <label>Seu nome completo</label>
          <input type="text" {...register("fullname")} />
          <InputError message={errors.fullname?.message} />
        </div>
        <div className={styles.row}>
          <label>Informe o nome da sua mãe</label>
          <input type="text" {...register("motherName")} />
          <InputError message={errors.motherName?.message} />
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
