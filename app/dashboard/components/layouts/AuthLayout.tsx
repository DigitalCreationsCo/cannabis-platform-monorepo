import { FlexBox, GrasSignature, H2, Paragraph } from '@cd/ui-lib';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import app from '@/lib/app';

interface AuthLayoutProps {
	children: React.ReactNode;
	heading?: string;
	description?: string;
}

export default function AuthLayout({
	children,
	heading,
	description,
}: AuthLayoutProps) {
	const { t } = useTranslation('common');

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-20 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<FlexBox className="flex-row justify-center content-center items-center">
						<GrasSignature>{t('gras')}</GrasSignature>
						<Image
							src={app.logoUrl}
							alt={app.name}
							width={53}
							height={53}
							quality={25}
						/>
					</FlexBox>
					{heading && (
						<H2 className="mt-6 text-center text-4xl leading-9">
							{t(heading)}
						</H2>
					)}
					{description && (
						<Paragraph className="text-lg text-center text-gray-600 dark:text-white">
							{t(description)}
						</Paragraph>
					)}
				</div>
				<div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
			</div>
		</>
	);
}
