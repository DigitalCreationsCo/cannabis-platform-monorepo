import {
	Card,
	H5,
	Icons,
	Page,
	PageHeader,
	Paragraph,
	type LayoutContextProps,
} from '@cd/ui-lib';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

function Support() {
	return (
		<Page className={twMerge(styles.gradient, 'p-0 md:pb-24')}>
			<Card className="h-full w-full self-center px-2 md:max-w-[500px]">
				<PageHeader title="Support" Icon={Icons.Shield} />
				<Paragraph>
					{`Thanks for choosing Gras.
            We're working around the clock to deliver a world class support service for your business.
            Reach out to us for support. 
			Our team is always ready to help.`}
				</Paragraph>
				<div className="m-auto">
					<Link href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}>
						<H5 className="whitespace-pre-line underline">
							{`email ${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`}
						</H5>
					</Link>
					<H5>{`phone ${process.env.NEXT_PUBLIC_SUPPORT_PHONE}`}</H5>
				</div>
			</Card>
		</Page>
	);
}

Support.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
	showSideNav: false,
});

export default Support;

const styles = {
	gradient: ['bg-gradient-to-b', 'from-primary', 'to-secondary', 'md:pt-16'],
};
