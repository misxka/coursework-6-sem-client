import { NextPage } from 'next';
import { useState } from 'react';
import CategoryField from '../../components/CategoryField/CategoryField';

import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Navbar/Navbar';
import { StartButton } from '../../components/StartButton/StartButton';
import { Card, Category, getCategoryById, getCategoryPaths } from '../../utils/category';

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
    <Layout home={false} pageTitle={name} headerContent={<Navbar />}>
      {/* <div className='cards'>
        {cards?.map(card => (
          <div key={card.id}>{card.word}</div>
        ))}
      </div> */}
      <CategoryField cards={cards as Card[]} />
    </Layout>
  );
};

export default Category;
