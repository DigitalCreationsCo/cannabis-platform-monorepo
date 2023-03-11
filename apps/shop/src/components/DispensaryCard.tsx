import { OrganizationWithShopDetails } from '@cd/data-access';
import { checkDispensaryIsOpen } from '@cd/shared-lib';
import { Card, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type DispensaryCardProps = {
    dispensary: OrganizationWithShopDetails;
    className?: string | string[];
};
function DispensaryCard({ dispensary, className }: DispensaryCardProps) {
    const styles = {
        dispensarycard: 'min-w-[300px] md:!min-w-[400px]'
    };
    return (
        <Card className={twMerge([styles.dispensarycard, className])} title={dispensary.name}>
            <Image src={dispensary.images?.[0].location} alt={dispensary.name} />
            {/* <Paragraph>{checkDispensaryIsOpen(dispensary.schedule)}</Paragraph> */}
            <Paragraph className="badge -ml-1">
                {checkDispensaryIsOpen({
                    days: 43210,
                    id: '1',
                    organizationId: '2',
                    openAt: 200,
                    closeAt: 2000,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    ? 'open now'
                    : 'closed'}
            </Paragraph>
            <Paragraph>{'hello'}</Paragraph>
            <Paragraph>{'id: ' + dispensary.id}</Paragraph>
            <Paragraph>{'id: ' + dispensary.id}</Paragraph>
        </Card>
    );
}

export default DispensaryCard;
