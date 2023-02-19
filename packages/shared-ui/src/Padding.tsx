import { PropsWithChildren } from 'react';

function Padding({ children }: PropsWithChildren) {
    return <div className="p-12">{children}</div>;
}

export default Padding;
