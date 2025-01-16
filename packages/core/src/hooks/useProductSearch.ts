import axios from 'axios';
import { useState } from 'react';
import { debounce } from '../utils';

const useProductSearch = () => {
	const [productSearchResult, setProductSearchResult] = useState<any[]>([]);
	const [notFoundResult, setNotFoundResult] = useState(false);

	const doSearchProducts = debounce(async (e: any) => {
		const value = e?.target?.value || null;
		if (value) {
			const data: any[] = await (
				await axios.post('/api/products', { search: value })
			).data;
			const variantProducts = data.flatMap((product) => product.variants);
			if (data?.length > 0) {
				setProductSearchResult(variantProducts);
				setNotFoundResult(false);
			} else {
				setProductSearchResult([]);
				setNotFoundResult(true);
			}
		} else {
			setProductSearchResult([]);
			setNotFoundResult(false);
		}
	}, 200);
	return { productSearchResult, notFoundResult, doSearchProducts };
};

export default useProductSearch;
