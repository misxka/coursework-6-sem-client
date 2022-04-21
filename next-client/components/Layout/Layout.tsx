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
    <div>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <title>{pageTitle}</title>
      </Head>
      <header className={styles.header}>{headerContent}</header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
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
