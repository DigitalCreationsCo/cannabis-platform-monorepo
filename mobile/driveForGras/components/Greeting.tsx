import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import { useAppSelector } from '@cd/core-lib/src/types/redux.types';
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
