import React, { PropsWithChildren } from "react";
import FlexBox from "./FlexBox"

function Center({ children }: PropsWithChildren) {
    return (
        <FlexBox className="grow justify-center">
            {children}
        </FlexBox>
    );
}

export default Center;