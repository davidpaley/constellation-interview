import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useFilterContext } from "./useFilterContext";

export const useGetData = (url: string) => {
  const { setFields } = useFilterContext();
  const { data, isLoading, isRefetching, error } = useQuery({
    queryKey: ["data", url],
    queryFn: async () => {
      const response = await axios.get<{ [key: string]: any }[]>(url);
      if (response.data) {
        return response.data;
      }
      return null;
    },
    onSuccess: data => {
      const keysSet: Set<string> = new Set();
      if (data?.length) {
        data.forEach(item => {
          const keysItem = Object.keys(item);
          keysItem.forEach(k => keysSet.add(k));
        });
      }
      const keys = Array.from(keysSet || []);
      setFields(keys);
    },
    enabled: !!url,
    retry: 0,
  });

  return { data, isLoading, isRefetching, error };
};
