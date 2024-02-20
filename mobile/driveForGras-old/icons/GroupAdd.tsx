import { MaterialIcons } from '@expo/vector-icons';

const GroupAdd = ({ size, color }) => (
	<MaterialIcons
		name="group-add"
		size={size * 1.25}
		color={color}
		style={{ marginTop: -1 }}
	/>
);

export default GroupAdd;
