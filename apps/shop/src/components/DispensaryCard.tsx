import { OrganizationWithShopDetails } from '@cd/data-access';
import { checkDispensaryIsOpen, renderAddress } from '@cd/shared-lib';
import { Card, FlexBox, Paragraph } from '@cd/shared-ui';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

type DispensaryCardProps = {
    dispensary: OrganizationWithShopDetails;
    className?: string | string[];
};
function DispensaryCard({ dispensary, className }: DispensaryCardProps) {
    const styles = {
        dispensarycard: ['min-w-[300px] md:w-[350px] p-4 md:p-4']
    };
    return (
        <Card className={twMerge([styles.dispensarycard, className])} title={dispensary.name}>
            <FlexBox className="items-end flex-row justify-between">
                <Image
                    src={dispensary.images?.[0].location}
                    alt={dispensary.name}
                    height={100}
                    width={100}
                    className="border"
                />
                {/* <Paragraph>{checkDispensaryIsOpen(dispensary.schedule)}</Paragraph> */}
                <Paragraph>
                    {renderAddress({
                        street1: '1239 2nd st',
                        street2: '',
                        city: 'Baltimore',
                        state: 'Maryland',
                        zipcode: '23456',
                        id: '2',
                        country: 'United States',
                        countryCode: 'US',
                        userId: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        organizationId: '1'
                    })}
                </Paragraph>
            </FlexBox>
            <Paragraph className="badge -ml-2 p-3 self-end absolute">
                {checkDispensaryIsOpen({
                    days: 6543210,
                    id: '1',
                    organizationId: '2',
                    openAt: 8,
                    closeAt: 20,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                    ? 'open now'
                    : 'closed'}
            </Paragraph>
        </Card>
    );
}

export default DispensaryCard;
