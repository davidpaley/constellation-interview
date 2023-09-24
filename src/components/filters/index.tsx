import { Flex, Button, Text, Skeleton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { OrFilters } from "../or-filters";
import React from "react";
import { useFilterContext } from "../../hooks/useFilterContext";

export const Filters = ({
  error,
  isLoading,
  url,
}: {
  error?: unknown;
  isLoading?: boolean;
  url?: string;
}) => {
  const { dispatch, rules, fields } = useFilterContext();

  const addFilter = () => {
    dispatch({
      type: "add_rule",
      andIndex: rules.data.length,
      orIndex: 0,
      newRule: { field: "", operation: "", value: "", isValidated: false },
    });
  };

  const rulesToRender = rules?.data;
  return (
    <Flex direction="column">
      <Flex direction="column" gap={3}>
        {isLoading && !!rulesToRender.length && !!url && (
          <Skeleton height={{ base: "289px", md: "81px" }} />
        )}
        {!error &&
          !isLoading &&
          rulesToRender.map((orRules, index) => (
            <React.Fragment key={`${index}-${rulesToRender.length}`}>
              {index > 0 && (
                <Text color="gray.400" textAlign="left" fontSize="2xl">
                  AND
                </Text>
              )}
              <OrFilters rules={orRules} index={index} />
            </React.Fragment>
          ))}
      </Flex>

      <Button
        my={5}
        maxW="10rem"
        leftIcon={<AddIcon />}
        onClick={() => addFilter()}
        isDisabled={!fields?.length || !!error}
        colorScheme="orange"
        variant={"outline"}
      >
        {rulesToRender.length ? "AND" : "Filters"}
      </Button>
    </Flex>
  );
};
