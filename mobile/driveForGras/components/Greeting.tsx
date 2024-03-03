import { selectDriverState } from '@cd/core-lib/src/reducer/driver.reducer';
import Icons from '@expo/vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { Padding } from './atomic';
import IconWrapper from './IconWrapper';
import { Text } from './Themed';

export default function Greeting() {
	const {
		user: { username },
	} = useSelector(selectDriverState).driver;
	return (
		<Padding style={{ flexDirection: 'row', alignItems: 'center' }}>
			<Text>Good day{(username && `, ${username}`) || ''}!</Text>
			<IconWrapper Icon={() => <Icons name="local-taxi" size={32} />} />
		</Padding>
	);
}
