import React, { PropsWithChildren } from "react";
import FlexBox from "./FlexBox"

function Center({ children }: PropsWithChildren) {
    return (
        <FlexBox className="place-content-center items-center">
            {children}
        </FlexBox>
    );
}

export default Center;