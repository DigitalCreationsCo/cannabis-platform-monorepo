import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import Icons from '../icons';
import IconWrapper from './IconWrapper';

const UploadImageBox = ({ onClick, onKeyUp, fill, children }: { onClick: any; onKeyUp?: any, fill?: boolean } & PropsWithChildren) => {

const styleUploadWindow = [fill ? 'h-full w-full' : 'h-[80px w-[80px]', 'border flex rounded-btn items-center justify-center bg-light'];

return (
    <div onClick={onClick} onKeyUp={onKeyUp} className={twMerge(styleUploadWindow, 'indicator')}>
        <span className="indicator-item badge bg-primary w-5 h-5 p-0 items-center justify-center">
            <IconWrapper Icon={Icons.XIcon} size={8} className={'fill-light'} />
        </span>
        {children}
    </div>
)}

export default UploadImageBox;
