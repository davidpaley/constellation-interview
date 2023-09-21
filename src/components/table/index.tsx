import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import { ApiData } from "../../models";

interface TableProps extends ApiData {
  isLoading: boolean;
  keys: string[];
}
export const Table = ({ data, isLoading, keys }: TableProps) => {
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
  if (!data?.length) return null;
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
          {data?.length &&
            data.map((objectItem, index) => (
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
