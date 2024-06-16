import NavigationItems, {
	type NavigationProps,
	type MenuItem,
} from './NavigationItems';

const ProductNavigation = ({ activePathname }: NavigationProps) => {
	if (!activePathname) {
		return null;
	}

	const menus: MenuItem[] = [];

	return <NavigationItems menus={menus} />;
};

export default ProductNavigation;
