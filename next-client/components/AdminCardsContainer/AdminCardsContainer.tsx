import { Card } from '../../utils/card';

import AdminCard from '../AdminCard/AdminCard';

import styles from './AdminCardsContainer.module.scss';

interface Props {
  cards: Card[];
}

export default function AdminCardsContainer(props: Props) {
  const { cards } = props;

  return (
    <div className={styles.adminCards}>
      <div className={styles.content}>
        {cards.map((elem, index) => (
          <AdminCard id={elem.id} key={index} word={elem.word} translation={elem.translation} soundFile={elem.audio} image={elem.image} />
        ))}
        {/* <NewCard
            updateCategories={this.props.updateCategories}
            updateCards={this.props.updateCards}
            updateAdminCategories={this.props.updateAdminCategories}
            updateAdminCards={this.updateAdminCards}
            category={category}
          /> */}
      </div>
    </div>
  );
}
