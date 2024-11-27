import { IoMdClose } from "react-icons/io";
import * as Dialog from "@radix-ui/react-dialog";

import styles from "@/app/styles/components/dialog/dialog.module.css";
import { useState } from "react";

export const CustomDialog = ({
	children,
	title,
	triggerText,
	// buttonText,
	isOpen = false,
	// action,
}: {
	children: React.ReactNode;
	title: string;
	triggerText: string;
	buttonText?: string;
	isOpen: boolean;
	action?: () => void;
}) => {
	const [open, setOpen] = useState(isOpen);

	return (
		<Dialog.Root modal open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button>{triggerText}</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className={styles.overlay} />
				<Dialog.Content className={styles.content}>
					<Dialog.Title className={styles.title}>{title}</Dialog.Title>
					{children}
					{/* <Dialog.Close asChild className={styles.continueButton}> */}
					{/*   <button onClick={action}>{buttonText}</button> */}
					{/* </Dialog.Close> */}
					{/* <Dialog.Close asChild>
						<button className={styles.closeButton} aria-label="Close">
							<IoMdClose size={20} />
						</button>
					</Dialog.Close> */}
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
