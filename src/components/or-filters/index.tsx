import { Flex, Text } from "@chakra-ui/react";
import { SingleFilter } from "../single-filter";
import { useEffect } from "react";
import { RuleObject } from "../../models";

interface OrFiltersProps {
  deleteParentFilter: (currentIndex: number) => void;
  index: number;
  rules: RuleObject[];
}

export const OrFilters = ({
  deleteParentFilter,
  index: andIndex,
  rules,
}: OrFiltersProps) => {
  useEffect(() => {
    if (rules.length < 1) {
      deleteParentFilter(andIndex);
    }
  }, [rules.length, deleteParentFilter]);

  return (
    <Flex
      border="0.3px solid #A0AEC0"
      padding={5}
      direction={{
        base: "column",
        md: "row",
      }}
      gap={6}
    >
      <Flex direction="column" gap={3} width="100%">
        {rules.map((rule, index) => (
          <Flex
            key={`${index}-${andIndex}-${rules.length}`}
            gap={3}
            direction={{
              base: "column",
              md: "row",
            }}
            width="100%"
          >
            {index > 0 && (
              <Text color="gray.400" textAlign="left" fontSize="2xl">
                OR
              </Text>
            )}
            <SingleFilter
              orIndex={index}
              andIndex={andIndex}
              field={rule.field}
              operation={rule.operation}
              value={rule.value}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
