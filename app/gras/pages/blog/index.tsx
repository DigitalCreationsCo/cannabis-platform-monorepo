import { Footer, type LayoutContextProps } from '@cd/ui-lib';
import { type GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type ReactElement } from 'react';
import { IndexPage, PreviewIndexPage } from '@/components/blog';
import {
  type Post,
  type Settings,
  readToken,
  getClient,
  getPosts,
  getSettings,
} from '@/lib/sanity';
import { type SharedPageProps } from '../_app';

interface DirectoryProps extends SharedPageProps {
  posts: Post[];
  settings: Settings;
}

interface Query {
  [key: string]: string;
}

export default function BlogDirectory(props: DirectoryProps) {
  if (props.draftMode && props.token) {
    return <PreviewIndexPage posts={props.posts} settings={props.settings} />;
  }
  return <IndexPage posts={props.posts} settings={props.settings} />;
}

export const getStaticProps: GetStaticProps<DirectoryProps, Query> = async (
  ctx
) => {
  const { draftMode = false, locale } = ctx;
  const client = getClient(draftMode ? { token: readToken } : undefined);

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getPosts(client),
  ]);

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      posts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  };
};

// BlogDirectory.getLayoutContext = (): LayoutContextProps => ({
// 	showHeader: false,
// 	showSearch: false,
// 	showSideNavOnDesktop: false,
// });

BlogDirectory.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {page}
      <Footer />
    </>
  );
};
