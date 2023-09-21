import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { CUSTOM_MEDIA_QUERIES } from "../../constants";
import { SingleFilter } from "../single-filter";
import { useState } from "react";
import { createArrayOfLength } from "../../utils";

interface OrFiltersProps {
  deleteParentFilter: (currentIndex: number) => void;
  index: number;
  keys?: string[];
}

export const OrFilters = ({
  deleteParentFilter,
  index: andIndex,
  keys,
}: OrFiltersProps) => {
  const [isMobileViewOpen] = useMediaQuery(CUSTOM_MEDIA_QUERIES.mobile);
  const [numberOfFilters, setNumberOfFilters] = useState(1);

  const renderArray = createArrayOfLength(numberOfFilters);
  const addFilter = () => {
    setNumberOfFilters(prevState => prevState + 1);
  };

  const deleteFilter = (index: number) => {
    setNumberOfFilters(prevState => {
      const newValue = prevState - 1;
      if (newValue < 1) {
        deleteParentFilter(andIndex);
      }
      return prevState - 1;
    });
  };
  return (
    <Flex
      border="0.3px solid #A0AEC0"
      padding={5}
      direction={isMobileViewOpen ? "column" : "row"}
      gap={6}
    >
      <Flex direction="column" gap={3} width="100%">
        {numberOfFilters > 0 &&
          renderArray.map((_, index) => (
            <Flex
              key={index}
              gap={3}
              direction={isMobileViewOpen ? "column" : "row"}
              width="100%"
            >
              {index > 0 && (
                <Text color="gray.400" textAlign="left" fontSize="2xl">
                  OR
                </Text>
              )}
              <SingleFilter
                addFilter={addFilter}
                orIndex={index}
                andIndex={andIndex}
                deleteFilter={deleteFilter}
                keys={keys}
              />
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
};
