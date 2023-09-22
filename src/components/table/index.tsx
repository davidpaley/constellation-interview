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
} from "@chakra-ui/react";
import { useMyContext } from "../../context/data-context";
import { ApiData } from "../../models";
import { getFilteredData } from "../../utils/rules";

interface TableProps extends ApiData {
  isLoading: boolean;
}
export const Table = ({ data, isLoading }: TableProps) => {
  const { rules, keys } = useMyContext();
  if (isLoading) {
    return (
      <Stack mx={5} mt={20} mb={20}>
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

  const filteredData = getFilteredData(data, rules.data);

  if (!filteredData.length) {
    return (
      <Container mb={40} color="gray.500">
        {"No data for those filters"}
      </Container>
    );
  }
  return (
    <TableContainer
      mx={10}
      mt={20}
      mb={60}
      maxH="md"
      overflowX="auto"
      overflowY="auto"
    >
      <ChakraTable variant="simple">
        <Thead>
          <Tr>{data?.length && keys.map(key => <Th key={key}>{key}</Th>)}</Tr>
        </Thead>
        <Tbody>
          {filteredData.map((objectItem, index) => (
            <Tr key={objectItem.id || index}>
              {keys.map((key, index) => {
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
  );
};
