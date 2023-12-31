/* eslint-disable react/prop-types */
import Layout from '@/components/Layout';
import Head from 'next/head';

import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '@/components/Date';
import utilStyles from '../../styles/utils.module.css';
import { useRouter } from 'next/router';
import { MDXRemote } from 'next-mdx-remote';
import CodeBlock from '@/components/CodeBlock';

export async function getStaticPaths() {
  const paths = getAllPostIds();

  // const paths = [
  //   {
  //     params: {
  //             id: 'ssg-ssr',
  //           },
  //   }
  // ]

  // fallback: Determines how to react when accessing an invalid URL.
  return {
    paths,
    fallback: true,
  };

  // If 'const paths = getAllPostIds();' is deleted and the code is created as above, only 'ssg-ssr' is build in advance.
  // And 'pre-rendering' is not built in advance, but if 'fallback: 'blocking'' or 'fallback: true' is set, the screen is displayed after waiting for data to arrive.
}

// 'getStaticProps' is displayed on the screen when building. However, localhost is activated only when the screen is open. In other words, if getStaticProps is present in the code below, it cannot be built. You can build it by using getServerSideProps instead.

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  // Since the 'getPostData' function itself is async, you need to add await.
  return {
    props: {
      postData,
    },
  };
}

const Button = ({ children }) => {
  return (
    <button
      className='bg-black dark:bg-white text-lg text-teal-200 dark: text-teal-700 rounded-lg px-5'
      onClick={() => alert(`thanks to ${children}`)}
    >
      {children}
    </button>
  );
};
const components = { Button, CodeBlock };

export default function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>
      
    </Layout>
  );
}
