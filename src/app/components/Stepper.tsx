import { useEffect, useState } from "react";

import styles from "@/app/styles/components/stepper.module.css";

interface StepperProps {
	step: string;
}

export const Stepper: React.FC<StepperProps> = ({ step }) => {
	const [steps, setSteps] = useState<string[]>([]);

	useEffect(() => {
		const localStorageSteps = window.localStorage.getItem("vibra_bb@steps");
		const jsonSteps = localStorageSteps ? JSON.parse(localStorageSteps) : [];

		// Only update if the step is not already present in the steps array
		if (!jsonSteps.includes(step)) {
			const newState = [...jsonSteps, step];
			window.localStorage.setItem("vibra_bb@steps", JSON.stringify(newState));
			setSteps(newState);
		} else {
			setSteps(jsonSteps); // Set the existing steps array from localStorage
		}

		return () => {
			// NOTE: When form is ready this will be removed
			// window.localStorage.removeItem("vibra_bb@steps");
		};
	}, [step]);

	return (
		<div className={styles.container}>
			<div className={`${styles.row} ${steps.length > 0 ? styles.active : ""}`}>
				<div className={styles.indicator}>{steps.length > 1 ? "ok" : "•"}</div>
				<p>Informações pessoais</p>
			</div>
			<div className={styles.divider} />
			<div className={`${styles.row} ${steps.length > 1 ? styles.active : ""}`}>
				<div className={styles.indicator}>{steps.length > 2 ? "ok" : "•"}</div>
				<p>Informações de identidade</p>
			</div>
			<div className={styles.divider} />
			<div className={`${styles.row} ${steps.length > 2 ? styles.active : ""}`}>
				<div className={styles.indicator}>{steps.length > 3 ? "ok" : "•"}</div>
				<p>Informações residência</p>
			</div>
			<div className={styles.divider} />
			<div className={`${styles.row} ${steps.length > 3 ? styles.active : ""}`}>
				<div className={styles.indicator}>{steps.length > 4 ? "ok" : "•"}</div>
				<p>Informações de renda</p>
			</div>
			<div className={styles.divider} />
			<div className={`${styles.row} ${steps.length > 4 ? styles.active : ""}`}>
				<div className={styles.indicator}>{steps.length > 5 ? "ok" : "•"}</div>
				<p>Selfie</p>
			</div>
		</div>
	);
};
