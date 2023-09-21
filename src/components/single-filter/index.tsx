import {
  Input,
  Select,
  IconButton,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { OPERATIONS } from "../../constants";
import { isStringANumber } from "../../utils";
import { RuleObject } from "../../models";

interface SingleFilterProps {
  deleteFilter: (index: number) => void;
  orIndex: number;
  andIndex: number;
  keys?: string[];
  addFilter: () => void;
}

export const SingleFilter = ({
  deleteFilter,
  orIndex,
  andIndex,
  keys,
  addFilter,
}: SingleFilterProps) => {
  const [field, setField] = useState("");
  const [operation, setOperation] = useState("");
  const [value, setValue] = useState("");
  // TODO: Set rule
  //   useEffect(() => {
  //     if (!!field && !!operation && !!value && !isError()) {
  //       setFilter({ field, operation, value }, index);
  //     }
  //   }, [field, operation, value]);

  const isError = () =>
    (operation === OPERATIONS.greaterThan ||
      operation === OPERATIONS.lessThan) &&
    value !== "" &&
    !isStringANumber(value);

  const errorInValue = isError();
  return (
    <>
      <Select
        onChange={e => {
          setField(e.target.value);
        }}
        disabled={!keys?.length}
        placeholder="Field selection"
      >
        {keys?.map((key, index) => (
          <option key={index} value={key}>
            {key}
          </option>
        ))}
      </Select>

      <Select
        disabled={!keys?.length}
        onChange={e => {
          setOperation(e.target.value);
        }}
        placeholder="Operator"
      >
        <option value={OPERATIONS.equals}>Equals</option>
        <option value={OPERATIONS.greaterThan}>Greater than</option>
        <option value={OPERATIONS.lessThan}>Less than</option>
        <option value={OPERATIONS.contain}>Contain</option>
        <option value={OPERATIONS.notContain}>Not Contain</option>
        <option value={OPERATIONS.regex}>Regex</option>
      </Select>

      <FormControl isInvalid={errorInValue}>
        <Input
          onChange={e => {
            setValue(e.target.value);
          }}
          value={value}
          disabled={!keys?.length}
          placeholder="value"
        />
        <FormErrorMessage>{errorInValue && "Incorrect value"}</FormErrorMessage>
      </FormControl>

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
        onClick={() => deleteFilter(orIndex)}
      />
    </>
  );
};
