import { IconWrapper, Small } from '@cd/shared-ui';
import { MouseEventHandler, PropsWithChildren, ReactEventHandler, SVGAttributes } from 'react';
type TagProps = {
    Icon?: (props: SVGAttributes<SVGElement>) => JSX.Element;
    onClick?: MouseEventHandler<HTMLElement> & ReactEventHandler<Element>;
} & PropsWithChildren;
function Tag({ Icon, onClick, children }: TagProps) {
    return (
        <div onClick={onClick} onKeyUp={onClick} className="cursor-default badge badge-primary m-2 gap-2 w-[112px]">
            <Small>{children}</Small>
            {Icon && <IconWrapper Icon={Icon} className="fill-light" size={11} />}
        </div>
    );
}

export default Tag;
