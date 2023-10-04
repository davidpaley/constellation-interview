import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Skeleton,
  Stack,
  Container,
  Heading,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { useFilterContext } from "../../hooks/useFilterContext";
import { ApiData } from "../../models";
import { getFilteredData } from "../../utils/rules";

interface TableProps extends ApiData {
  isLoading: boolean;
  error?: unknown;
}
export const Table = ({ data, isLoading, error }: TableProps) => {
  const { rules: filters, fields } = useFilterContext();

  if (!!error) {
    return (
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
    );
  }
  if (isLoading) {
    return (
      <Stack data-testid="loading-skeleton" mx={5} mt={20} mb={20}>
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
        <Skeleton height="45px" />
      </Stack>
    );
  }

  if (!data?.length) {
    return (
      <Container mb={40} color="gray.500">
        {"No data "}
      </Container>
    );
  }

  const filteredData = getFilteredData(data, filters.data);

  if (!filteredData.length) {
    return (
      <Container mb={40} color="gray.500">
        {"No data for those filters"}
      </Container>
    );
  }
  return (
    <>
      <Heading mt={10} mb={5} mx={10} textAlign={"left"}>
        Results
      </Heading>
      <Flex mb={3} mx={10} gap={3}>
        <Tag maxW={40} px={5} size={{ base: "md", md: "lg" }} height="0.5rem">
          {`Total: ${data.length}`}
        </Tag>
        <Tag
          variant="solid"
          maxW={40}
          px={5}
          size={{ base: "md", md: "lg" }}
          height="0.5rem"
          colorScheme="orange"
        >
          {`Filtered: ${filteredData.length}`}
        </Tag>
      </Flex>
      <TableContainer
        mx={10}
        mb={60}
        maxH="md"
        overflowX="auto"
        overflowY="auto"
      >
        <ChakraTable variant="simple">
          <Thead>
            <Tr>
              {data?.length && fields.map(key => <Th key={key}>{key}</Th>)}
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((objectItem, index) => (
              <Tr key={objectItem.id || index}>
                {fields.map((key, index) => {
                  return (
                    <Td key={index}>
                      {typeof objectItem[key] === "object"
                        ? JSON.stringify(objectItem[key])
                        : objectItem[key] || ""}
                    </Td>
                  );
                })}
              </Tr>
            ))}
          </Tbody>
        </ChakraTable>
      </TableContainer>
    </>
  );
};
