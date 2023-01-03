import { debounce } from "utils";
import axios from "axios";
import { useState } from "react";

const useProductSearch = () => {
  const [resultList, setResultList] = useState<any[]>([]);
  const [notFoundResult, setNotFoundResult] = useState(false);

  const doSearchProducts = debounce(async (e) => {
    const value = e?.target?.value || null;
    if (value) {
      const { data } = await axios.post("/api/products", { search: value });
      if (data?.length > 0) {
        setResultList(data);
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
  return { resultList, notFoundResult, doSearchProducts };
};

export default useProductSearch;
