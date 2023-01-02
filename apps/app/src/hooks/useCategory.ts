import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Category } from "__types__/common";

export default function useCategory() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("/api/category")
      .then(({ data }) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log(error.response.data);
        toast.error(error.response.data.message || error.response.data.error.message);
      });
  }, []);

  return { categories };
};
