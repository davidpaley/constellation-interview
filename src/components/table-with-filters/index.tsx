import { useQuery } from "@tanstack/react-query";
import { Table } from "../table";
import { Container, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { isURL } from "../../utils";

export const TableWithFilters = () => {
  const [url, setUrl] = useState("");
  const onChangeUrl = (value: string) => {
    if (isURL(value)) {
      setUrl(value);
      return;
    }
    setUrl("");
  };

  const { data, isLoading, isRefetching, error } = useQuery({
    queryKey: ["data", url],
    queryFn: async () => {
      const response = await axios.get<{ [key: string]: any }[]>(url);
      if (response.data) {
        return response.data;
      }
      return null;
    },
    enabled: !!url,
    retry: 0,
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
        <Table data={data} isLoading={isLoading || isRefetching} />
      ) : (
        <Container mb={40} color="gray.500">
          {"No data"}
        </Container>
      )}
      {!!error && (
        <Container
          mb={40}
          height="50vh"
          display={"flex"}
          justifyContent="center"
          alignItems={"center"}
          color="red.500"
        >
          {"Error fetching data"}
        </Container>
      )}
    </>
  );
};
