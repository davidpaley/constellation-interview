import { Input, Select, IconButton } from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

interface SingleFilterProps {
  addFilter: () => void;
  deleteFilter: (index: number) => void;
  index: number;
  keys?: string[];
}

export const SingleFilter = ({
  addFilter,
  deleteFilter,
  index,
  keys,
}: SingleFilterProps) => {
  return (
    <>
      <Select disabled={!keys?.length} placeholder="Field selection">
        {keys?.map(key => (
          <option value={key}>{key}</option>
        ))}
      </Select>

      <Select disabled={!keys?.length} placeholder="Operator">
        <option value="equals">Equals</option>
        <option value="greaterThan">Greater than</option>
        <option value="lessThan">Less than</option>
        <option value="lessThan">Less than</option>
        <option value="contain">Contain</option>
        <option value="notContain">Not Contain</option>
        <option value="regex">Regex</option>
      </Select>

      <Input disabled={!keys?.length} placeholder="value" />

      <IconButton
        disabled={!keys?.length}
        color="blue"
        aria-label="Search database"
        onClick={addFilter}
        icon={<AddIcon />}
      />
      <IconButton
        disabled={!keys?.length}
        color="#ff8585"
        aria-label="Search database"
        icon={<DeleteIcon />}
        onClick={() => deleteFilter(index)}
      />
    </>
  );
};
