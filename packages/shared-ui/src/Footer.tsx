import React from 'react';
import { Paragraph } from './Typography';

export default function Footer() {
    return (
        <div className="h-[300px] p-12 md:px-24 bg-primary">
            <Paragraph className="text-inverse font-semibold">Gras Cannabis Distribution Co. &#169;</Paragraph>
        </div>
    );
}
