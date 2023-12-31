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
import { useFilterContext } from "../../hooks/useFilterContext";

interface SingleFilterProps {
  orIndex: number;
  andIndex: number;
  field?: string;
  operation?: string;
  value?: string;
  showAddFilterSkeleton: (showSkeleton: boolean) => void;
  rulesLength: number;
}

export const SingleFilter = ({
  orIndex,
  andIndex,
  field: fieldProp,
  operation: operationProp,
  value: valueProp,
  showAddFilterSkeleton,
  rulesLength,
}: SingleFilterProps) => {
  const { dispatch, fields } = useFilterContext();
  const [field, setField] = useState(fieldProp || "");
  const [operation, setOperation] = useState(operationProp || "");
  const [value, setValue] = useState(valueProp || "");

  useEffect(() => {
    dispatch({
      type: "add_rule",
      andIndex,
      orIndex,
      newRule: { field, operation, value, isValidated: isValidated() },
    });
  }, [field, operation, value, dispatch]);

  const onAddFiler = () => {
    dispatch({
      type: "add_rule",
      andIndex,
      orIndex: rulesLength,
      newRule: {
        field: "",
        operation: "",
        value: "",
        isValidated: false,
      },
    });
  };

  const onDeleteFilter = () => {
    dispatch({
      type: "delete_or_rule",
      andIndex,
      orIndex,
    });
  };

  const isValidated = () =>
    !(
      (operation === OPERATIONS.greaterThan ||
        operation === OPERATIONS.lessThan) &&
      (value !== "" || !value) &&
      !isStringANumber(value)
    );

  const errorInValue = !isValidated();
  return (
    <>
      <Select
        onChange={e => {
          setField(e.target.value);
        }}
        value={field}
        disabled={!fields?.length}
        placeholder="Field selection"
      >
        {fields?.map((key, index) => (
          <option key={index} value={key}>
            {key}
          </option>
        ))}
      </Select>

      <Select
        disabled={!fields?.length}
        onChange={e => {
          setOperation(e.target.value);
        }}
        value={operation}
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
          disabled={!fields?.length}
          placeholder="value"
        />
        <FormErrorMessage>{errorInValue && "Incorrect value"}</FormErrorMessage>
      </FormControl>

      <IconButton
        disabled={!fields?.length}
        color="blue"
        aria-label="Search database"
        onClick={onAddFiler}
        onMouseEnter={() => showAddFilterSkeleton(true)}
        onMouseLeave={() => showAddFilterSkeleton(false)}
        icon={<AddIcon />}
      />
      <IconButton
        disabled={!fields?.length}
        color="#ff8585"
        aria-label="Search database"
        icon={<DeleteIcon />}
        onClick={onDeleteFilter}
      />
    </>
  );
};
