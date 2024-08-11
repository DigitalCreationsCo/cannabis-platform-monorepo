import { type User } from '@cd/data-access';

export default function UserPage({ user }: { user: User }) {
	return (
		<div>
			<h1>{user.name}</h1>
			{/* <p>{user.bio}</p> */}
		</div>
	);
}
