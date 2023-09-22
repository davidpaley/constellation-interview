import { ApiData } from "../../models";
import { Flex, Button, Text } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { OrFilters } from "../or-filters";
import { useState } from "react";
import React from "react";
import { useMyContext } from "../../context/data-context";

export const Filters = () => {
  const [_, setNumberOFilters] = useState(0);
  const { dispatch, rules, keys } = useMyContext();

  const addFilter = () => {
    setNumberOFilters(prevState => {
      dispatch({
        type: "add_rule",
        andIndex: prevState,
        orIndex: 0,
        newRule: { field: "", operation: "", value: "", isValidated: false },
      });
      return prevState + 1;
    });
  };

  const deleteFilter = () => {
    setNumberOFilters(prevState => prevState - 1);
  };
  const rulesToRender = rules?.data;
  return (
    <Flex direction="column">
      <Flex direction="column" gap={3}>
        {rulesToRender.map((orRules, index) => (
          <React.Fragment key={`${index}-${rulesToRender.length}`}>
            {index > 0 && (
              <Text color="gray.400" textAlign="left" fontSize="2xl">
                AND
              </Text>
            )}
            <OrFilters
              rules={orRules}
              deleteParentFilter={deleteFilter}
              index={index}
            />
          </React.Fragment>
        ))}
      </Flex>

      <Button
        my={5}
        maxW="xs"
        colorScheme="facebook"
        leftIcon={<AddIcon />}
        onClick={() => addFilter()}
        isDisabled={!keys?.length}
      >
        {rulesToRender.length ? "AND" : "Filters"}
      </Button>
    </Flex>
  );
};
