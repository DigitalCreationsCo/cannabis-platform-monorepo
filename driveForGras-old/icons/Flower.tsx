import { MaterialCommunityIcons } from '@expo/vector-icons';

const Flower = ({ size = 28, color = 'green' }) => (
	<MaterialCommunityIcons
		name="flower"
		size={size}
		color={color}
		fill={color}
	/>
);

export default Flower;
