import { Input, Select, IconButton } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

interface SingleFilterProps {
  addFilter: () => void;
  deleteFilter: (index: number) => void;
  index: number;
}

export const SingleFilter = ({
  addFilter,
  deleteFilter,
  index,
}: SingleFilterProps) => {
  return (
    <>
      <Select placeholder="Field selection">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>

      <Select placeholder="Operator">
        <option value="equals">Equals</option>
        <option value="greaterThan">Greater than</option>
        <option value="lessThan">Less than</option>
        <option value="lessThan">Less than</option>
        <option value="contain">Contain</option>
        <option value="notContain">Not Contain</option>
        <option value="regex">Regex</option>
      </Select>

      <Input placeholder="value" />

      <IconButton
        color="blue"
        aria-label="Search database"
        onClick={addFilter}
        icon={<AddIcon />}
      />
      <IconButton
        color="#ff8585"
        aria-label="Search database"
        icon={<DeleteIcon />}
        onClick={() => deleteFilter(index)}
      />
    </>
  );
};
