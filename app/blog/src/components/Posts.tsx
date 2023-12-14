import Head from 'next/head';
import { type Post } from '../lib/sanity.queries';
import InfoCard from './InfoCard';

function Posts({ posts = [] }: { posts: Post[] }) {
	const title = posts.length === 1 ? `1 Post` : `${posts.length} Posts`;

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			{/* <Grid className="grid-flow-col-dense auto-cols-min auto-rows-min gap-4"> */}
			<div className="flex flex-wrap gap-4">
				{posts.length ? (
					posts.map((post) => <InfoCard key={post._id} data={post} />)
				) : (
					<div>Welcome. There no posts here.</div>
				)}
			</div>
			{/* </Grid> */}
		</>
	);
}

export default Posts;
