import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoMdClose } from "react-icons/io";

import styles from "@/app/styles/components/dialog/dialog.module.css";

export const CustomDialog = ({
  children,
  title,
  triggerText,
  isOpen = false,
  close,
}: {
  children: React.ReactNode;
  title: string;
  triggerText: string;
  isOpen: boolean;
  close?: boolean;
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
          {close && (
            <Dialog.Close asChild>
              <button className={styles.closeButton}>
                <IoMdClose size={20} />
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
