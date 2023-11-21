function Screen(Component: any) {
	const _Component = () => {
		return <Component />;
	};
	_Component.displayName = `Screen-(${Component.name})`;
	return _Component;
}
export default Screen;
