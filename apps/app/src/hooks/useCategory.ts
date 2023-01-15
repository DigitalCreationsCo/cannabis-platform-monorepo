import { Category } from '@cd/data-access';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { debounce } from '../utils';

export default function useCategory() {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categorySearchResult, setSearchResult] = useState<Category[]>([]);
    const [notFoundCategories, setNotFound] = useState(false);

    const doSearchCategories = debounce(async (e) => {
        if (categoryList.length === 0) {
            try {
                const { data } = await axios('/api/category');
                if (data.categories?.length === 0) {
                    setSearchResult([]);
                    setNotFound(true);
                } else {
                    setCategoryList(data.categories);
                    setNotFound(false);
                }
            } catch (error) {
                setNotFound(true);
                toast.error(error.response.data);
            }
        }
        const value = e?.target?.value.toLowerCase() || null;
        if (value) {
            searchCategories(value);
        }
    }, 200);
    doSearchCategories();

    function searchCategories(value: string) {
        setSearchResult(categoryList.filter((c) => c.name.toLowerCase().match(value)));
    }

    return { categoryList, categorySearchResult, notFoundCategories, doSearchCategories };
}
