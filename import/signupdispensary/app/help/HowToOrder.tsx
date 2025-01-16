import { CopyRight, FlexBox, H2, Paragraph, Video } from '@gras/ui';

function HowToOrder() {
	return (
		<div className="md:m-auto space-y-4">
			<H2 className="text-primary">How To Place Your Delivery Order</H2>
			<Paragraph className="max-w-md mx-auto">
				Placing an order for Delivery By Gras is easy. {'\n'}Place a delivery
				order from your favorite Dispensary by following the steps below.
			</Paragraph>
			<EmbedVideo />
			<CopyRight />
		</div>
	);
}

export default HowToOrder;

const EmbedVideo = () => {
	return (
		<FlexBox className="p-8 m-auto flex-col gap-8">
			<Video
				Embed={() => (
					<iframe
						className="m-auto rounded h-full aspect-video max-h-[240px] w-full max-w[620px]"
						src="https://www.youtube.com/embed/jnjA4hPyKoc?si=3C4G8KUgah9EakQ9"
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					></iframe>
				)}
			/>
		</FlexBox>
	);
};
