import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { InputError } from "../../InputError";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const IdentityMediaSchema = z.object({
  docFront: z
    .any()
    .refine(
      (file) => file && file[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  docBack: z
    .any()
    .refine(
      (file) => file && file[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 5MB.`
    )
    .refine(
      (file) => file && ACCEPTED_IMAGE_TYPES.includes(file[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

export type IdentityMediaFormData = z.infer<typeof IdentityMediaSchema>;

export const DocumentMediaDialog: React.FC = () => {
  const { updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IdentityMediaFormData>({
    resolver: zodResolver(IdentityMediaSchema),
  });
  const router = useRouter();

  const handleContinue = useCallback(
    (data: IdentityMediaFormData) => {
      // NOTE: Validate form and save in localstorage
      if (isValid) {
        updateFormData({ documentMedia: data }, "identity");
        router.push("residencia");
      }
    },
    [isValid]
  );

  return (
    <CustomDialog
      title="Enviar fotos do documento"
      triggerText="Começar"
      isOpen={true}
    >
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Frente do documento</label>
          <input
            multiple={false}
            type="file"
            {...register("docFront", { required: true })}
          />
          <InputError message={errors.docFront?.message?.toString()} />
        </div>
        <div className={styles.row}>
          <label>Verso do documento</label>
          <input
            multiple={false}
            type="file"
            {...register("docBack", { required: true })}
          />
          <InputError message={errors.docBack?.message?.toString()} />
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
