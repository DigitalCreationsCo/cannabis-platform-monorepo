import { Button, FlexBox } from '@cd/shared-ui';

function CategoriesSelector() {
    return (
        <FlexBox className="flex-row space-x-0 px-4 lg:!space-x-8 overflow-x-scroll">
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
                'Vapes'
            ].map((category, index) => (
                <Button key={category + index} bg={'primary'} className="flex-none">
                    <li className="list-none">{category}</li>
                </Button>
            ))}
        </FlexBox>
    );
}

export default CategoriesSelector;
