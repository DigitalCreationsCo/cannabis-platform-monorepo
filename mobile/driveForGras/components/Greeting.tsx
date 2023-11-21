import Icons from '../icons';
import { Text, Row } from './Themed';
// import { useSelector } from 'react-redux';

export default function Greeting() {
	// const userStore = useSelector((state) => state.user.user);
	const { username } = { username: 'BigChief' };
	return (
		<Row>
			<Text>Good day{(username && `, ${username}`) || ''}!</Text>
			<Icons.Flower />
		</Row>
	);
}
