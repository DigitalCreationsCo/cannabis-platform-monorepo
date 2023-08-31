import { type HTMLAttributes } from 'react';
import { Tiny } from './Typography';

function CopyRight(props: HTMLAttributes<HTMLDivElement>) {
	const companyName = 'Gras';
	return <Tiny className={props.className}>{companyName} &#169; 2023</Tiny>;
}

export default CopyRight;
