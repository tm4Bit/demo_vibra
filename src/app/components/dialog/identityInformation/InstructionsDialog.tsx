import { useCallback } from "react";
import { CustomDialog } from "../../dialog/Dialog";

import styles from "@/app/styles/components/dialog/styles.module.css";

interface Props {
	gotoNext: (n: number) => void;
}

export const InstructionsDialog: React.FC<Props> = ({ gotoNext }) => {
	const handleContinue = useCallback(() => {
		gotoNext(2);
	}, []);

	return (
		<CustomDialog
			title="Instruções para imagem do documento"
			triggerText="Começar"
			isOpen={true}
		>
			<div className={styles.list}>
				<ul>
					<li>Use seu RG ou CNH.</li>
					<li>
						Retire a capa de plástico e tire uma foto do documento de frete e
						outro do verso.
					</li>
					<li>Fotografe o documento em um local com boa iluminação.</li>
					<li>
						Certifique-se de que todos os dados do documento estão legíveis.
					</li>
				</ul>
			</div>
			<div className={styles.actionContainer}>
				<button onClick={handleContinue} type="button" className={styles.submitButton}>Ok, entendi!</button>
			</div>
		</CustomDialog>
	);
};
