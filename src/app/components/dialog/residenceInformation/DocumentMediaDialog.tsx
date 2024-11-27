import { useCallback } from "react";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";
import { useFormContext } from "@/app/hooks/useFormContext";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdErrorOutline } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface Props {
  gotoNext: (n: number) => void;
}

const fileSchema = z
  .any()
  .optional() // Allow missing files
  .refine(
    (file) => !file || (file[0] && file[0].size <= MAX_FILE_SIZE),
    "Tamanho máximo do arquivo é de 5MB!"
  )
  .refine(
    (file) => !file || (file[0] && ACCEPTED_IMAGE_TYPES.includes(file[0].type)),
    "Apenas formatos .jpg, .jpeg, .png and .webp são suportados!"
  );

const DocumentMediaSchema = z.object({
  frontDocumentImage: fileSchema,
  backDocumentImage: fileSchema,
});

export type DocumentMediaFormData = z.infer<typeof DocumentMediaSchema>;

export const DocumentMediaDialog: React.FC<Props> = ({ gotoNext }) => {
  const { updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DocumentMediaFormData>({
    resolver: zodResolver(DocumentMediaSchema),
  });
  const handleContinue = useCallback(
    (data: DocumentMediaFormData) => {
      // NOTE: Validate form and save in localstorage
      if (isValid) {
        updateFormData({ documentMedia: data }, "residence");
        gotoNext(2);
      }
    },
    [isValid]
  );

  return (
    <CustomDialog
      title="Enviar foto do comprovante de residência"
      triggerText="Começar"
      isOpen={true}
    >
      <form onSubmit={handleSubmit(handleContinue)}>
        <div className={styles.row}>
          <label>Frente do comprovante</label>
          <input type="file" {...register("frontDocumentImage")} />
          {errors.frontDocumentImage && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.frontDocumentImage?.message?.toString()}</span>
            </span>
          )}
        </div>
        <div className={styles.row}>
          <label>Verso do comprovante</label>
          <input type="file" {...register("backDocumentImage")} />
          {errors.backDocumentImage && (
            <span className={styles.errorContainer}>
              <MdErrorOutline size={16} color="#ff0000" />
              <span>{errors.backDocumentImage?.message?.toString()}</span>
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
