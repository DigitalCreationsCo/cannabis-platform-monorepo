import { Category } from "@cd/data-access";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { debounce } from "../utils";

export default function useCategory() {
    const [ categories, setCategories ] = useState<Category[]>([]);
    const [resultList, setResultList] = useState<any[]>([]);
    const [ notFoundResult, setNotFoundResult ] = useState(false);
    
    const doSearchCategories = debounce(async (e) => {
        const value = e?.target?.value.toLowerCase() || null;
        if (value) {
            if (categories.length > 0) {
                setResultList(categories.filter(c => c.name.toLowerCase().match(value)))
                setNotFoundResult(false);
            } else {
                setResultList([]);
                setNotFoundResult(true);
            }
        } else {
            setResultList([]);
            setNotFoundResult(false);
        }
    }, 200);
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
        axios("/api/category")
            .then(({ data }) => setCategories(data.categories))
            .then()
            .catch(error => {
              console.error('error: ', error);
              toast.error(error.response.data);
            });
        }
    }, []);
    return { categories, resultList, notFoundResult, doSearchCategories };
};
