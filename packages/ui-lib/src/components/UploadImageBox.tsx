import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import IconWrapper from './IconWrapper';

const styleUploadWindow = ['h-[80px] w-[80px] border flex rounded-btn relative items-center justify-center bg-light'];
const UploadImageBox = ({ onClick, onKeyUp, children }: { onClick: any; onKeyUp?: any } & PropsWithChildren) => (
    <div onClick={onClick} onKeyUp={onKeyUp} className={twMerge(styleUploadWindow, 'indicator')}>
        <span className="indicator-item badge bg-primary w-5 h-5 p-0 items-center justify-center">
            <IconWrapper Icon={Icons.XIcon} size={8} className={'fill-light'} />
        </span>
        {children}
    </div>
);

export default UploadImageBox;
