import { checkDispensaryIsOpen, formatDispensaryUrl, renderAddress } from '@cd/core-lib';
import { OrganizationWithShopDetails } from '@cd/data-access';
import { Card, FlexBox, H2, Paragraph } from '@cd/ui-lib';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type DispensaryCardProps = {
    data: OrganizationWithShopDetails;
    loading?: boolean;
    className?: string | string[];
};
function DispensaryCard({ data: dispensary, loading, className }: DispensaryCardProps) {

    const styles = {
        dispensarycard: [
            'relative', 'min-w-[340px] w-[340px] h-[220px] p-4 !rounded'
        ],
        isOpenBadge: [
            "text-inverse border-2 tracking-wider z-5 top-0 right-0 p-3 m-3 badge absolute"
        ]
    };
    // console.log('image: ', dispensary?.images?.[0]?.location)
    return (
        <Link href={formatDispensaryUrl(dispensary?.subdomainId as string)} className='z-0 relative rounded shadow-lg rounded'>
        <Card className={twMerge([styles.dispensarycard, 'rounded hover:scale-101 transition duration-500', className])}>
            <ImageBackDrop
            src={dispensary?.images?.[0].location}
            >
                <H2 className='whitespace-normal drop-shadow z-5 p-2 tracking-wide absolute top-0 left-0 text-inverse'>
                    {dispensary?.name}</H2>
                <FlexBox className="z-5 p-2 absolute bottom-0 left-0 items-end flex-row justify-between">
                    <Paragraph className='text-inverse drop-shadow'>
                        {renderAddress({
                            address: dispensary?.address,
                            showCountry: false,
                            showZipcode: false,
                            lineBreak: true,
                        })}
                    </Paragraph>
                </FlexBox>
                <Paragraph className={twMerge(styles.isOpenBadge)}>
                    {checkDispensaryIsOpen(dispensary.schedule)}</Paragraph>
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
            </ImageBackDrop>
            </Card>
        </Link>
    );
}


const ImageBackDrop = ({ src, children }: { src: string} & PropsWithChildren) => {
    return (
        <div 
        className="absolute rounded max-h-full w-fit top-0 left-0"
        style={{ clipPath: 'inset(0 0 0 0)' }}
        >
            <img 
            className='w-full min-h-full rounded'
            src={src} 
            alt="" 
            style={{ objectFit: 'contain', objectPosition: '44% 20%' }} 
            />
            <div 
            className='rounded'
                style={{
                    backgroundColor: 'rgba(1,12,2,0.22)',
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: '0',
                    top: '0'
                }}
            ></div>
            {children}
        </div>
    );
};

export default DispensaryCard;
