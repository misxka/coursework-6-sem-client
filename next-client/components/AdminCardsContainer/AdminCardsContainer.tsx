import { Card } from '../../utils/card';

import AdminCard from '../AdminCard/AdminCard';
import NewCard from '../NewCard/NewCard';

import styles from './AdminCardsContainer.module.scss';

interface Props {
  cards: Card[];
  refreshCards: (card: Card) => void;
  categoryId: number;
}

export default function AdminCardsContainer(props: Props) {
  const { cards, refreshCards, categoryId } = props;

  return (
    <div className={styles.adminCards}>
      <div className={styles.content}>
        {cards.map((elem, index) => (
          <AdminCard categoryId={categoryId} id={elem.id} key={index} word={elem.word} translation={elem.translation} soundFile={elem.audio} image={elem.image} />
        ))}
        <NewCard refreshCards={refreshCards} categoryId={categoryId} />
      </div>
    </div>
  );
}
