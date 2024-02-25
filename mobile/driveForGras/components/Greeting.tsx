import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import Icons from '@expo/vector-icons/MaterialIcons';
import { Text, Row } from './Themed';
import {useSelector } from 'react-redux'

export default function Greeting() {
	const {
		user: { username },
	} = useSelector(selectDriverState).driver;
	return (
		<Row>
			<Text>Good day{(username && `, ${username}`) || ''}!</Text>
			<Icons name="nature" />
		</Row>
	);
}
