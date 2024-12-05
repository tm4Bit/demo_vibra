import Link from "next/link";

import styles from "@/app/styles/pages/styles.module.css";

export default function InstructionsPage() {
  return (
    <>
      {/* title */}
      <h3 className={`${styles.title} ${styles.row}`}>
        Como solicitar seu cartão Petrobras:
      </h3>

      {/* banner */}
      <div className={styles.banner}>
        <img src="/img/i_card.svg" alt="" />
      </div>
      <div className={styles.row}>
        <ul>
          <li>
            Preencha suas informações pessoais, profissionais e do cartão.
          </li>
          <li>
            Esteja com seu RG ou CNH em mãos. Será necessário enviar fotos do
            documento.
          </li>
          <li>
            Um comprovante de renda será solicitado. Podem ser usados
            contracheque, Declaração fornecida pela fonte pagadora,
            Demonstrativos de rendimentos, DECORE, Declaração de IR acompanhada
            de recibo, Comprovante de rendimentos pagos e retenção de IR na
            fonte, Extrato do INSS ou Aviso de Crédito à Pesquisador/Bolsista. O
            documento de comprovação de renda deve ser emitido há menos de 90
            dias.
          </li>
          <li>
            Esteja com um comprovante de residência. Serão aceitos como
            comprovantes contas de água, luz, telefone, gás, celular, internet
            ou TV por assinatura ou faturas de Cartão de crédito emitido pelo
            BB. O documento deve ter sido emitido há menos de 90 dias, em nome
            do próprio cliente ou dos pais, quando comprovado o relacionamento
            entre as partes (documento de identidade).
          </li>
        </ul>
      </div>

      {/* action btn */}
      <div className={styles.actionContainer}>
        <Link href="/nao_correntista/pessoais">Continuar</Link>
      </div>
    </>
  );
}
