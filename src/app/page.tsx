import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { DeclarationsDialog } from "./components/DeclarationsDialog";

import styles from "./styles/home.module.css";

const pitch = [
  {
    title: "4x mais pontos",
    desc: "Pagando seu abastecimento com o cartão Petrobras você ganha mais pontos.",
  },
  {
    title: "Cashback",
    desc: "Com suas compras, você acumula pontos que podem virar desconto na fatura.",
  },
  {
    title: "Cartão de crédito internacional",
    desc: "Bandeira Visa com ampla aceitação no Brasil e no mundo.",
  },
  {
    title: "Até 4 cartões adicionais gratuitos",
    desc: "Inclua até 4 dependentes na sua fatura sem custo de anuidade.",
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      {/* goback action */}
      <div className={styles.row}>
        <a href="/">
          <MdOutlineKeyboardDoubleArrowLeft size={24} />
        </a>
      </div>

      {/* title */}
      <h3 className={`${styles.title} ${styles.row}`}>
        Cartão Petrobras, o cartão que todo mundo escolhe!
      </h3>

      {/* banner */}
      <div className={styles.banner}>
        <img src="img/banner1.webp" alt="" />
      </div>

      {/* pitch */}
      {pitch.map((item, index) => {
        return (
          <div key={index} className={`${styles.row} ${styles.pitch}`}>
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        );
      })}
      {/* action btn */}
      <div className={styles.actionContainer}>
        <DeclarationsDialog />
      </div>
    </div>
  );
}
