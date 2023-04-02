import Link from 'next/link';
import { Button } from '@cd/shared-ui';
import { twMerge } from 'tailwind-merge';

function CartButton({ totalItems }: { totalItems: number }) {
    return (
        <Link href="/cart">
            <Button className="relative">
                Bag
                {totalItems >= 1 && (
                    <div
                        className={twMerge(
                            'absolute inline-flex items-center justify-center w-6 h-6 text-sm text-light bg-primary -top-2 -right-2 rounded-full'
                        )}
                    >
                        {totalItems}
                    </div>
                )}
            </Button>
        </Link>
    );
}

export default CartButton;
