import { debounce } from "utils";
import axios from "axios";
import { useState } from "react";

const useProductSearch = () => {
  const [categorySearchResult, setcategorySearchResult] = useState<any[]>([]);
  const [notFoundResult, setNotFoundResult] = useState(false);

  const doSearchProducts = debounce(async (e) => {
    const value = e?.target?.value || null;
    if (value) {
      const { data } = await axios.post("/api/products", { search: value });
      if (data?.length > 0) {
        setcategorySearchResult(data);
        setNotFoundResult(false);
      } else {
        setcategorySearchResult([]);
        setNotFoundResult(true);
      }
    } else {
      setcategorySearchResult([]);
      setNotFoundResult(false);
    }
  }, 200);
  return { categorySearchResult, notFoundResult, doSearchProducts };
};

export default useProductSearch;
