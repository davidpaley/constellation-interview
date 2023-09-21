import { useQuery } from "@tanstack/react-query";
import { getData } from "../../api";
import { Table } from "../table";
export const TableWithFilters = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  return (
    <Table data={data} isLoading={isLoading} />
  );
};
