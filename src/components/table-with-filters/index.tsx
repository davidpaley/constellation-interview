import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Container,
  Box,
} from "@chakra-ui/react";

import { useQuery } from "@tanstack/react-query";
import { getData } from "../../api";
export const TableWithFilters = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: getData,
  });

  return (
    <TableContainer
      mx={5}
      mt={20}
      mb={20}
      maxH="md"
      overflowX="auto"
      overflowY="auto"
    >
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
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
        <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
