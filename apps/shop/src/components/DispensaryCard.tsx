import { checkDispensaryIsOpen, formatDispensaryUrl, renderAddress } from '@cd/core-lib';
import { OrganizationWithShopDetails } from '@cd/data-access';
import { Card, FlexBox, Paragraph } from '@cd/ui-lib';
import Image from 'next/image';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

type DispensaryCardProps = {
    data: OrganizationWithShopDetails;
    loading?: boolean;
    className?: string | string[];
};
function DispensaryCard({ data: dispensary, loading, className }: DispensaryCardProps) {
    const styles = {
        dispensarycard: ['min-w-[340px] w-[340px] h-[220px] p-4 !rounded']
    };
    // console.log('image: ', dispensary?.images?.[0]?.location)
    return (
        <Link href={formatDispensaryUrl(dispensary?.subdomainId as string)} >
            <Card className={twMerge([styles.dispensarycard, className])} title={dispensary?.name}>
                <FlexBox className="items-end flex-row justify-between">
                    {dispensary?.images?.[0] && (
                        <Image
                            src={dispensary?.images?.[0].location}
                            alt={dispensary?.name || ''}
                            height={100}
                            width={100}
                            className="border"
                        />
                    )}
                    <Paragraph>
                        {renderAddress({
                            address: dispensary?.address
                        })}
                    </Paragraph>
                </FlexBox>
                <Paragraph>{checkDispensaryIsOpen(dispensary.schedule)}</Paragraph>
                {/* <Paragraph className="badge -ml-2 p-3 text-primary self-end absolute">
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
                </Paragraph> */}
            </Card>
        </Link>
    );
}

export default DispensaryCard;
