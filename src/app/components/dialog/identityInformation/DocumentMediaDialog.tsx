import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdErrorOutline } from "react-icons/md";

import { CustomDialog } from "../../dialog/Dialog";
import { useFormContext } from "@/app/hooks/useFormContext";

import styles from "@/app/styles/components/dialog/styles.module.css";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const DocumentMediaSchema = z.object({
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

export type DocumentMediaFormData = z.infer<typeof DocumentMediaSchema>;

export const DocumentMediaDialog: React.FC = () => {
  const { updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DocumentMediaFormData>({
    resolver: zodResolver(DocumentMediaSchema),
  });
  const router = useRouter();

  const handleContinue = useCallback(
    (data: DocumentMediaFormData) => {
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
          {errors.docFront && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.docFront?.message?.toString()}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Verso do documento</label>
          <input
            multiple={false}
            type="file"
            {...register("docBack", { required: true })}
          />
          {errors.docBack && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.docBack?.message?.toString()}</span>
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
