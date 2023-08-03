import { Button, FlexBox } from '@cd/ui-lib';

function CategoriesSelector() {
	return (
		<FlexBox className="flex-row justify-center space-x-8">
			{['All', 'Flowers', 'Concentrates', 'Edibles', 'Topicals', 'Vapes'].map(
				(category) => (
					<Button key={category}>
						<li className="list-none">{category}</li>
					</Button>
				)
			)}
		</FlexBox>
	);
}

export default CategoriesSelector;
