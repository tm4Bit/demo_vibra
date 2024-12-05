import { FaAnglesLeft } from "react-icons/fa6";

import { StepsProvider } from "@/app/context/stepsContext";

import styles from "@/app/styles/pages/styles.module.css";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <a href="/">
          <FaAnglesLeft size={18} />
        </a>
      </div>
      <StepsProvider>{children}</StepsProvider>
    </div>
  );
}
