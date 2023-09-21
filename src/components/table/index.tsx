import { ApiData } from "../../models";
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
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

interface TableProps {
  data: ApiData[] | undefined;
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
  return (
    <TableContainer
      mx={5}
      mt={20}
      mb={20}
      maxH="md"
      overflowX="auto"
      overflowY="auto"
    >
      <ChakraTable variant="simple">
        <TableCaption>Nasa Data</TableCaption>
        <Thead>
          <Tr>
            {data?.length &&
              Object.keys(data[0]).map(key => <Th key={key}>{key}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {data?.length &&
            data.map(objectItem => (
              <Tr key={objectItem.id}>
                <Td>{objectItem.name || ""}</Td>
                <Td>{objectItem.id || ""}</Td>
                <Td>{objectItem.nametype || ""}</Td>
                <Td>{objectItem.recclass || ""}</Td>
                <Td>{objectItem.mass || ""}</Td>
                <Td>{objectItem.fall || ""}</Td>
                <Td>{new Date(objectItem.year).getFullYear() || ""}</Td>
                <Td>{objectItem.reclat || ""}</Td>
                <Td>{objectItem.reclong || ""}</Td>
                <Td>
                  {`type: ${objectItem?.geolocation?.type || "Unknown"}, ${
                    objectItem?.geolocation?.coordinates?.length
                      ? `coordinates: [${objectItem?.geolocation.coordinates[0]}, ${objectItem.geolocation.coordinates[1]}]`
                      : ""
                  } ` || ""}
                </Td>
              </Tr>
            ))}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  );
};
