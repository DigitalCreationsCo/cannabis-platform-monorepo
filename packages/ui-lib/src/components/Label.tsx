import { PropsWithChildren } from 'react';

function Label({ children }: PropsWithChildren) {
	return <label>{children}</label>;
}

export default Label;
