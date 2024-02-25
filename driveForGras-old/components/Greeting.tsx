import { useAppSelector, selectDriverState } from '@cd/core-lib';
import Icons from '../icons';
import { Text, Row } from './Themed';

export default function Greeting() {
	const {
		user: { username },
	} = useAppSelector(selectDriverState).driver;
	return (
		<Row>
			<Text>Good day{(username && `, ${username}`) || ''}!</Text>
			<Icons.Flower />
		</Row>
	);
}
