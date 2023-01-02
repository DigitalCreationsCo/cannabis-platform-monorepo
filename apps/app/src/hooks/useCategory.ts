import { Category } from "@cd/data-access";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [ categories, setCategories ] = useState<Category[]>([]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
        axios("/api/category")
            .then(({ data }) => setCategories(data))
            .catch(error => {
              console.error('error: ', error);
              toast.error(error.response.data);
            });
        }
    }, [categories]);
    return { categories };
};
