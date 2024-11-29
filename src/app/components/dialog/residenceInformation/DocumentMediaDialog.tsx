import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useFormContext } from "@/app/hooks/useFormContext";

import { CustomDialog } from "../../dialog/Dialog";
import { InputError } from "../../InputError";

import styles from "@/app/styles/components/dialog/styles.module.css";

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

const ResidenceMediaSchema = z.object({
  frontDocumentImage: fileSchema,
  backDocumentImage: fileSchema,
});

export type ResidenceMediaFormData = z.infer<typeof ResidenceMediaSchema>;

export const DocumentMediaDialog: React.FC<Props> = ({ gotoNext }) => {
  const { updateFormData } = useFormContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResidenceMediaFormData>({
    resolver: zodResolver(ResidenceMediaSchema),
  });

  const handleContinue = useCallback(
    (data: ResidenceMediaFormData) => {
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
          <InputError
            message={errors.frontDocumentImage?.message?.toString()}
          />
        </div>
        <div className={styles.row}>
          <label>Verso do comprovante</label>
          <input type="file" {...register("backDocumentImage")} />
          <InputError message={errors.backDocumentImage?.message?.toString()} />
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
