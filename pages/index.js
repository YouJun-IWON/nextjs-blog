import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import Date from '../components/Date';

// or getServerSideProps()
export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

// 'getStaticProps' is displayed on the screen when building. However, localhost is activated only when a person opens the screen. That is, the code below cannot be built in the state of getStaticProps. You can build in getServerSideProps.

// But don't use it like this. This is because 'getServerSideProps' is for client-side to server-side communication, not server-to-server communication.

// In other words, API Routes should not be used on the server-side. 

// getStaticProps / getStaticPaths are not included in the client-code code. 

// This means that information that cannot be confirmed by the client can be set.

// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3000/api/posts');
//   const json = await response.json();

//   return {
//     props: {
//       allPostsData: json.allPostsData,
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm web3 developer</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
