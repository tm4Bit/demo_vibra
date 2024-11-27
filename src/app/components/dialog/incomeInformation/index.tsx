import { useCallback } from "react";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

interface Props {
  gotoNext: (n: number) => void;
}

export const InstructionsDialog: React.FC<Props> = ({ gotoNext }) => {
  const handleContinue = useCallback(() => {
    // NOTE: Validate form and save in localstorage
    gotoNext(1);
  }, []);

  return (
    <CustomDialog
      title="Instruções para imagem do comprovante de renda"
      triggerText="Começar"
      isOpen={false}
    >
      <div className={styles.list}>
        <ul>
          <li>
            Use um contracheque; declaração fornecida pela fonte pagadora;
            demonstrativos de rendimentos, DECORE; declaração de IR acompanhada
            de recibo; comprovante de rendimentos pagos e retenção de IR na
            fonte, extrato do INSS; ou Aviso de Crédito à Pesquisador/Bolsista.
          </li>
          <li>Fotografe o documento em um local com boa iluminação. </li>
          <li>
            Certifique-se de que todos os dados do documento estão legíveis.
          </li>
          <li>
            O documento de comprovação de renda deve ser emitido há menos de 90
            dias, salvo se houver indicação de prazo específico para sua renda.{" "}
          </li>
        </ul>
      </div>
      <div className={styles.actionContainer}>
        <button
          onClick={handleContinue}
          type="button"
          className={styles.submitButton}
        >
          Ok, entendi!
        </button>
      </div>
    </CustomDialog>
  );
};
