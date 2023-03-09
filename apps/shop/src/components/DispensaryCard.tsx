import { Card } from '@cd/shared-ui';
import { twMerge } from 'tailwind-merge';

type DispensaryCard = {
    dispensary: string;
};
function DispensaryCard({ dispensary }) {
    return (
        <Card className={twMerge(['w-[200px]'])} title={dispensary.name}>
            {'id: ' + dispensary.id}
        </Card>
    );
}

export default DispensaryCard;
