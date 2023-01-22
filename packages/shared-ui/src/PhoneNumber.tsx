import { Paragraph } from './Typography';
import React from 'react';
export default function PhoneNumber({ phone }: { phone: string }) {
    const split = phone.split('-');
    const formatPhoneNumber =
        split[0] + '-' + split[1].substr(0, 3) + '-' + split[1].substr(3, 3) + '-' + split[1].substr(6, 4);
    return <Paragraph>{formatPhoneNumber}</Paragraph>;
}
