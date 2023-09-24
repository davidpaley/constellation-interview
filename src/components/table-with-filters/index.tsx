import { Table } from "../table";
import { Container, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { isURL } from "../../utils";
import { Filters } from "../filters";
import { useGetData } from "../../hooks/useGetData";

export const TableWithFilters = () => {
  const onChangeUrl = (value: string) => setUrl(isURL(value) ? value : "");
  const [url, setUrl] = useState("");

  const { data, isLoading, isRefetching, error } = useGetData(url);

  return (
    <>
      <Flex px={10} gap={6} direction="column" mb={!!url ? 5 : 60}>
        <Input
          onChange={e => onChangeUrl(e.target.value)}
          mt={10}
          placeholder="URL"
          maxW="md"
        />
        <Filters error={error} url={url} isLoading={isLoading} />
      </Flex>
      {!!url ? (
        <Table
          data={data}
          isLoading={isLoading || isRefetching}
          error={error}
        />
      ) : (
        <Container mb={40} color="gray.500">
          {"Please set an URL to load data from an array"}
        </Container>
      )}
    </>
  );
};
