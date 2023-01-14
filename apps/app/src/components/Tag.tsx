import { IconWrapper, Small } from '@cd/shared-ui';
import React, { PropsWithChildren, SVGAttributes } from 'react';
type TagProps = {
    Icon: boolean | ((props: SVGAttributes<SVGElement>) => JSX.Element);
    onClick?: React.MouseEventHandler<HTMLDivElement>;
} & PropsWithChildren;
function Tag({ Icon, onClick, children }: TagProps) {
    return (
        <div onClick={onClick} onKeyUp={() => {}} className="cursor-default badge badge-primary m-2 gap-2 w-[112px]">
            <Small>{children}</Small>
            {Icon && <IconWrapper Icon={Icon} className="fill-light" size={11} />}
        </div>
    );
}

export default Tag;
