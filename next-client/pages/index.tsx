import type { NextPage } from 'next';

import { CategoryCard } from '../components/CategoryCard/CategoryCard';
import { Category, getAllCategories } from '../utils/category';
import Navbar from '../components/Navbar/Navbar';

import styles from '../styles/Home.module.scss';
import Layout from '../components/Layout/Layout';
import GameModeButton from '../components/GameModeButton/GameModeButton';

interface Props {
  categories: Category[];
}

export async function getStaticProps() {
  const categories = await getAllCategories();
  return {
    props: {
      categories
    }
  };
}

const Home: NextPage<Props> = ({ categories }) => {
  const pageTitle = 'Школа иностранных языков';

  return (
    <Layout
      home
      pageTitle={pageTitle}
      headerContent={
        <>
          <GameModeButton />
          <Navbar />
        </>
      }
    >
      <div className={styles.linkCards}>
        {categories.map(({ id, name, cards }) => (
          <CategoryCard key={id} id={id} name={name} image={cards ? cards[0].image : (process.env.NEXT_PUBLIC_DEFAULT_IMAGE as string)} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
