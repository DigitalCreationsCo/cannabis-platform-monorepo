import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import { H4, H5 } from './Typography';

type CardProps = { className?: string; title?: string; amount?: string | number };

function Card({ className, title, amount, children }: CardProps & PropsWithChildren) {
    const styles = {
        cardContainer:
            'm-auto h-max w-full md:!w-5/6 lg:!w-2/3 bg-light flex flex-col shadow drop-shadow max-w-screen p-2 !pb-12 md:p-5 md:px-12 !rounded-none md:!rounded-btn'
    };
    return (
        <div className={twMerge(styles.cardContainer, className)}>
            {title && <H5 className="whitespace-pre">{title}</H5>}
            {amount !== undefined && <H4>{amount}</H4>}
            {children}
        </div>
    );
}

export default Card;
