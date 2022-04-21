import Head from 'next/head';
import Link from 'next/link';

import styles from './Layout.module.scss';

interface Props {
  headerContent: any;
  children: any;
  home: boolean;
  pageTitle: string;
}

export default function Layout({ children, home, pageTitle, headerContent }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='Learn how to build a personal website using Next.js' />
        <title>{pageTitle}</title>
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <header>{headerContent}</header>
      <main className={styles.main}>{children}</main>
      <footer>
        {!home && (
          <div className={styles.backToHome}>
            <Link href='/'>
              <a className={styles.link}>← Вернуться домой</a>
            </Link>
          </div>
        )}
      </footer>
    </div>
  );
}
