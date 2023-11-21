import { type PropsWithChildren } from 'react';
import Card from './Card';

function Row({ children }: { className?: string } & PropsWithChildren) {
	return <Card>{children}</Card>;
}

export default Row;
