import { Card } from '../../utils/card';

import AdminCard from '../AdminCard/AdminCard';
import NewCard from '../NewCard/NewCard';

import styles from './AdminCardsContainer.module.scss';

interface Props {
  cards: Card[];
  refreshCards: (card: Card) => void;
  updateCardsOnDelete: (id: number) => void;
  categoryId: number;
  updateCards: (id: number, card: Card) => void;
}

export default function AdminCardsContainer(props: Props) {
  const { cards, refreshCards, categoryId, updateCardsOnDelete, updateCards } = props;

  return (
    <div className={styles.adminCards}>
      <div className={styles.content}>
        {cards.map((elem, index) => (
          <AdminCard
            updateCards={updateCards}
            updateCardsOnDelete={updateCardsOnDelete}
            categoryId={categoryId}
            id={elem.id}
            key={index}
            word={elem.word}
            translation={elem.translation}
            soundFile={elem.audio}
            image={elem.image}
          />
        ))}
        <NewCard refreshCards={refreshCards} categoryId={categoryId} />
      </div>
    </div>
  );
}
