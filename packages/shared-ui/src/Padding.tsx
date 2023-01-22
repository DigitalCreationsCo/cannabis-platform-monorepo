import React, { PropsWithChildren } from 'react';

function Padding({ children }: PropsWithChildren) {
    return <div className="p-20">{children}</div>;
}

export default Padding;
