import { Paragraph } from '@cd/shared-ui';
import { Address } from '@prisma/client';

export const renderAddress = (address: Address) => (
    <Paragraph className={'whitespace-pre-line'}>
        {`${address.street1} ${address.street2}
        ${address.city} ${address.state}
        ${address.country} ${address.zipcode}`}
    </Paragraph>
);
