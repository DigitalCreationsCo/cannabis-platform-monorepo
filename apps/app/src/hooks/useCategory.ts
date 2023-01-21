import { Category } from '@cd/data-access';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { debounce } from '../utils';

// what data is needed from this hook module?
// category list,
// searchResult
// search function
// optimal data flow:
// categories is fetched in useffect hook, empty dep
// search is performed outside of use effect

export default function useCategory() {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categorySearchResult, setSearchResult] = useState<Category[]>([]);
    const [notFoundCategories, setNotFound] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const { data } = await axios('/api/category');
                if (data.categories?.length !== undefined) {
                    setCategoryList(data.categories);
                    setNotFound(false);
                }
            } catch (error) {
                setCategoryList([]);
                setNotFound(true);
                toast.error(error.response.data);
            }
        };

        getCategories();
    }, []);

    // console.log('categoryList ', categoryList);

    const doSearchCategories = debounce(async (e) => {
        // if (categoryList.length === 0) {
        //     try {
        //         const { data } = await axios('/api/category');
        //         if (data.categories?.length === 0) {
        //             setSearchResult([]);
        //             setNotFound(true);
        //         } else {
        //             setCategoryList(data.categories);
        //             setNotFound(false);
        //         }
        //     } catch (error) {
        //         setNotFound(true);
        //         toast.error(error.response.data);
        //     }
        // }
        const value = e?.target?.value.toLowerCase() || null;
        // if (value) {
        searchCategories(value);
        // }
    }, 200);

    function searchCategories(value: string) {
        if (value) {
            setSearchResult(categoryList.filter((c) => c.name.toLowerCase().match(value)));
        } else {
            setSearchResult(categoryList);
        }
    }

    return { categoryList, categorySearchResult, notFoundCategories, doSearchCategories };
}
