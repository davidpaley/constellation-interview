import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Table } from "../table";
import { Container, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { isURL } from "../../utils";

export const TableWithFilters = () => {
  const queryClient = useQueryClient();
  const [url, setUrl] = useState("");

  const onChangeUrl = (value: string) => {
    queryClient.invalidateQueries(["data"]);
    if (isURL(value)) {
      setUrl(value);
      return;
    }
    setUrl("");
  };

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["data"],
    queryFn: async () => axios.get<{ [key: string]: any }[]>(url),
    enabled: !!url,
  });

  return (
    <>
      <Input
        onChange={e => onChangeUrl(e.target.value)}
        mx={5}
        mt={10}
        mb={!!url ? 5 : 60}
        placeholder="URL"
        maxW="md"
      />
      {!!url ? (
        <Table data={data?.data} isLoading={isLoading || isRefetching} />
      ) : (
        <Container mb={40} color="gray.500">
          {"No data"}
        </Container>
      )}
    </>
  );
};
