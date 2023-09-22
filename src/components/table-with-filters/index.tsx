import { useQuery } from "@tanstack/react-query";
import { Table } from "../table";
import { Container, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { isURL } from "../../utils";
import { Filters } from "../filters";
import { useMyContext } from "../../context/data-context";

export const TableWithFilters = () => {
  const { setKeys } = useMyContext();
  const onChangeUrl = (value: string) => setUrl(isURL(value) ? value : "");
  const [url, setUrl] = useState("");

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
      setKeys(keys);
    },
    enabled: !!url,
    retry: 0,
  });

  const keysSet: Set<string> = new Set();
  if (data?.length) {
    data.forEach(item => {
      const keysItem = Object.keys(item);
      keysItem.forEach(k => keysSet.add(k));
    });
  }
  const keys = Array.from(keysSet || []);

  return (
    <>
      <Flex px={10} gap={6} direction="column" mb={!!url ? 5 : 60}>
        <Input
          onChange={e => onChangeUrl(e.target.value)}
          mt={10}
          placeholder="URL"
          maxW="md"
        />
        <Filters />
      </Flex>
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
