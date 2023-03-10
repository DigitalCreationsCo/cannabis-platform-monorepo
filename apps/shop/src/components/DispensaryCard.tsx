import { Card } from '@cd/shared-ui';
import { twMerge } from 'tailwind-merge';

type DispensaryCard = {
    dispensary: string;
    className: string | string[];
};
function DispensaryCard({ dispensary, className }) {
    return (
        <Card className={twMerge(['max-w-1/3', className])} title={dispensary.name}>
            {'id: ' + dispensary.id}
        </Card>
    );
}

export default DispensaryCard;
