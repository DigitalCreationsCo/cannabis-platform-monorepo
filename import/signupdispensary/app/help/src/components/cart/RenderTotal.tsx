import { selectCartState } from '@gras/core';
import { H4, Price } from '@gras/ui';
import { useSelector } from 'react-redux';

function RenderTotal({ total }: { total?: number }) {
	const totalCart = useSelector(selectCartState).total;
	total = total || totalCart;

	return (
		<div className="h-8">
			{total > 0 ? (
				<H4 className={styles.total}>
					Your total is
					<Price basePrice={total} />
				</H4>
			) : null}
		</div>
	);
}

export default RenderTotal;

const styles = {
	total: 'flex flex-row col-span-2 justify-end',
};
