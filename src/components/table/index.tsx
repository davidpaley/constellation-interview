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
}
export const Table = ({ data, isLoading }: TableProps) => {
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
  const arrayOfKeys = Object.keys(data[0]);
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
        <TableCaption>Nasa Data</TableCaption>
        <Thead>
          <Tr>
            {data?.length && arrayOfKeys.map(key => <Th key={key}>{key}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {data?.length &&
            data.map((objectItem, index) => (
              <Tr key={objectItem.id || index}>
                {arrayOfKeys.map((key, index) => {
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
