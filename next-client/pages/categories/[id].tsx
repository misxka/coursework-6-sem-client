import { NextPage } from 'next';
import Head from 'next/head';
import { Category, getCategoryById, getCategoryPaths } from '../../utils/category';

interface Props {
  categoryData: Category;
}

interface StaticProps {
  params: {
    id: number;
  };
}

export async function getStaticPaths() {
  const paths = await getCategoryPaths();
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: StaticProps) {
  const categoryData = await getCategoryById(params.id);
  return {
    props: {
      categoryData
    }
  };
}

const Category: NextPage<Props> = ({ categoryData }) => {
  const { name, cards } = categoryData;

  return (
    <div>
      <Head>
        <title>{name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        {cards?.map(card => (
          <div key={card.id}>{card.word}</div>
        ))}
      </main>
    </div>
  );
};

export default Category;
