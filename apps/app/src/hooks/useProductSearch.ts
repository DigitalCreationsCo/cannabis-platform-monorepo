import { debounce } from "utils";
import axios from "axios";
import { useState } from "react";

const useProductSearch = () => {
  const [resultList, setResultList] = useState<any[]>([]);
  const [notFoundResult, setNotFoundResult] = useState(false);

  const search = debounce(async (e) => {
    const value = e?.target?.value || null;
    console.log('value: ', value)
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
  return { resultList, notFoundResult, search };
};

export default useProductSearch;
