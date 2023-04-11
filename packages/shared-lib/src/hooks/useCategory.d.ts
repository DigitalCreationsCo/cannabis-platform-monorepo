export default function useCategory(): {
    categoryList: Category[];
    categorySearchResult: Category[];
    notFoundCategories: boolean;
    doSearchCategories: (...args: any[]) => void;
};
