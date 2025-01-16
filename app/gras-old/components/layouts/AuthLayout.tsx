import { FlexBox, GrasSignature, H2, Paragraph } from '@gras/ui';
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
			<div className="flex min-h-full flex-1 flex-col justify-center p-8 sm:py-20 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm gap-y-2">
					<FlexBox className="drop-shadow-lg flex-row items-center justify-self center content-center">
						<Image
							src={app.logoUrl}
							className="mr-2 h-12 w-auto"
							alt={app.name}
							width={48}
							height={48}
							quality={25}
						/>
						<GrasSignature className="text-secondary pb-0 mb-0 leading-3">
							{t('gras')}
						</GrasSignature>
					</FlexBox>
					{heading && <H2>{t(heading)}</H2>}
					{description && (
						<Paragraph className="pt-2 px-2">{t(description)}</Paragraph>
					)}
				</div>
				<div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">{children}</div>
			</div>
		</>
	);
}
