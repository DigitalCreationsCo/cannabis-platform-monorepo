import FlexBox from './FlexBox';
import { H3 } from './Typography';
import Video from './Video';

const EmbedVideo = ({ url }: { url: string }) => {
	return (
		<FlexBox className="p-8 m-auto flex-col gap-8">
			<div>
				<H3 className="text-inverse drop-shadow-xl mt-3 max-w-2xl text-center text-3xl font-bold leading-snug tracking-wider lg:text-4xl lg:leading-tight">
					How Does It Work?
				</H3>
			</div>
			<Video
				Embed={() => (
					<iframe
						className="m-auto rounded h-full aspect-video max-h-[240px] w-full max-w[620px]"
						src={url}
						title="YouTube video player"
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen
					></iframe>
				)}
			/>
		</FlexBox>
	);
};

export default EmbedVideo;
