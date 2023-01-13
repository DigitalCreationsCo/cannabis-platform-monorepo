import React from 'react';
import { Paragraph } from './Typography';

export default function Footer() {
    return (
        <div className="flex flex-col grow min-h-[188px] p-12 md:px-24 bg-secondary self-end place-self-end">
            <Paragraph className="text-inverse font-semibold">Gras Cannabis Distribution Co. &#169; 2023</Paragraph>
        </div>
    );
}
