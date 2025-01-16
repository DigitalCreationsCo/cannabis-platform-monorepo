import { Paragraph } from '@gras/ui';
import { type GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import router from 'next/router';
import React, { type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { AccountLayout } from '@/components/layouts';

const Custom500 = () => {
	const { t } = useTranslation('common');
	return (
		<div className="w-full items-center justify-center lg:px-2 xl:px-0 text-center dark:bg-black">
			<Paragraph className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider dark:text-gray-300">
				{t('error-500')}
			</Paragraph>
			<Paragraph className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider dark:text-gray-300 mt-2">
				{t('internal-server-error')}
			</Paragraph>
			<Paragraph className="text-lg md:text-xl lg:text-2xl dark:text-gray-500 my-12">
				{t('unable-to-find')}
			</Paragraph>
			<div className="mt-8 space-x-5">
				<button
					onClick={(e: any) => {
						e.preventDefault();
						router.back();
					}}
					className="btn btn-primary dark:border-zinc-600 dark:border-2 dark:text-zinc-200 btn-outline py-3 px-2 sm:px-4 btn-md"
				>
					{t('go-back')}
				</button>
				<Paragraph className="text-lg md:text-xl lg:text-2xl dark:text-gray-500 my-12">
					{t('try-again-later')}
				</Paragraph>
			</div>
		</div>
	);
};

export default Custom500;

Custom500.getLayout = function getLayout(page: ReactElement) {
	return <AccountLayout>{page}</AccountLayout>;
};

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
	return {
		props: {
			...(locale ? await serverSideTranslations(locale, ['common']) : {}),
		},
	};
}
