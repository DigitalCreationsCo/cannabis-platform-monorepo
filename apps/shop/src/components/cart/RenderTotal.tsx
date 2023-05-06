import { selectCartState } from '@cd/core-lib';
import { H4, Price } from '@cd/ui-lib';
import { useSelector } from 'react-redux';

function RenderTotal() {
    const { total } = useSelector(selectCartState);
    
    return <H4 className={styles.total}>
    Your total is <Price basePrice={total} /></H4>
}

export default RenderTotal

const styles = {
    total: 'flex flex-row col-span-2 justify-end'
};