import { selectCartState } from '@cd/core-lib';
import { H4, Price } from '@cd/ui-lib';
import { useSelector } from 'react-redux';

function RenderTotal({ total }: { total?: number }) {
	const totalCart = useSelector(selectCartState).total;
	total = total || totalCart;

	return total > 0 ? (
		<div className="h-8">
			<H4 className={styles.total}>
				Your total is
				<Price basePrice={total} />
			</H4>
		</div>
	) : (
		<></>
	);
}

export default RenderTotal;

const styles = {
	total: 'flex flex-row col-span-2 justify-end',
};
