import { ApiData } from "../../models";
import { Flex, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { OrFilters } from "../or-filters";
import { useState } from "react";
import { createArrayOfLength } from "../../utils";
import React from "react";
interface FiltersProps extends ApiData {}

export const Filters = ({ data }: FiltersProps) => {
  const [numberOfFilters, setNumberOfFilters] = useState(0);
  const renderArray = createArrayOfLength(numberOfFilters);
  const addFilter = () => {
    setNumberOfFilters(prevState => prevState + 1);
  };

  const deleteFilter = (index: number) => {
    setNumberOfFilters(prevState => prevState - 1);
  };

  return (
    <Flex direction="column">
      <Flex direction="column" gap={3}>
        {numberOfFilters > 0 &&
          renderArray.map((_, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <Text color="gray.400" textAlign="left" fontSize="2xl">
                  AND
                </Text>
              )}
              <OrFilters deleteParentFilter={deleteFilter} index={index} />
            </React.Fragment>
          ))}
      </Flex>

      <Button
        my={5}
        maxW="xs"
        colorScheme="facebook"
        leftIcon={<AddIcon />}
        onClick={() => addFilter()}
      >
        AND
      </Button>
    </Flex>
  );
};
