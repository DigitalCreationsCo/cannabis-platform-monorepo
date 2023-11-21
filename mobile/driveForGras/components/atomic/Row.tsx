import { type PropsWithChildren } from 'react';
import { Card } from '@components';

function Row({ children }: { className?: string } & PropsWithChildren) {
	return <Card>{children}</Card>;
}

export default Row;
