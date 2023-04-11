declare const useProductSearch: () => {
    productSearchResult: ProductVariantWithDetails[];
    notFoundResult: boolean;
    doSearchProducts: (...args: any[]) => void;
};
export default useProductSearch;
