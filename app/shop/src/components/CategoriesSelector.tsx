import { Button, FlexBox } from '@cd/ui-lib';

function CategoriesSelector() {
	return (
		<FlexBox className="hidden flex-row space-x-0 overflow-x-scroll px-4 lg:flex lg:!space-x-8">
			{/* <div>left</div> */}
			{[
				'All',
				'Flowers',
				'Concentrates',
				'Edibles',
				'Topicals',
				'Vapes',
				'Flowers',
				'Concentrates',
				'Edibles',
				'Topicals',
				'Vapes',
			].map((category, index) => (
				<Button key={category + index} bg={'primary'} className="flex-none">
					<li className="list-none">{category}</li>
				</Button>
			))}
			{/* <div>right</div> */}
		</FlexBox>
	);
}

export default CategoriesSelector;
