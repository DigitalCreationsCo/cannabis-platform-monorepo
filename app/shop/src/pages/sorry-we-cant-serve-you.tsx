import { Center, H1, H6, type LayoutContextProps, Page } from '@cd/ui-lib';
import Image from 'next/image';
import meadow from '../../public/meadow.jpg';

function AgeNotEnough() {
	return (
		<Page>
			<Center className="m-auto w-[300px] space-y-4 p-4 sm:w-[440px]">
				<H1 className="text-primary">
					Sorry, we can't serve you at this time.
				</H1>
				<Image
					className="rounded"
					src={meadow}
					alt="Come back when you're 21"
					height={250}
				/>
				<H6>
					Thank you for choosing Delivery by Gras. Unfortunately, you're not old
					enough to enjoy cannabis and hemp products, according to federal and
					state laws. Come back when you're 21 years or older.
				</H6>
			</Center>
		</Page>
	);
}

AgeNotEnough.getLayoutContext = (): LayoutContextProps => ({
	showHeader: false,
});

export default AgeNotEnough;
