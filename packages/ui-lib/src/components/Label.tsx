import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

function Label({ children, ...props }: LabelProps) {
	return <label {...props}>{children}</label>;
}

export default Label;
