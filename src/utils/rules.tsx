import { OPERATIONS } from "../constants";
import { ApiDataObject, RuleObject } from "../models";

const applyFilters = (dataItem: ApiDataObject, filters: RuleObject[][]) => {
  // Define a function to apply an individual filter
  const applyFilter = (item: ApiDataObject, filter: RuleObject) => {
    const { field, operation, value } = filter;
    if (!filter.isValidated || !field || !value) {
      throw new Error("Trying to evaluate an incorrect filter");
    }
    console.log({ operation });
    switch (operation) {
      case OPERATIONS.contain:
        return item[field].includes(value);
      case OPERATIONS.notContain:
        return !item[field].includes(value);
      case OPERATIONS.regex:
        const regex = new RegExp(value);
        return regex.test(item[field]);
      case OPERATIONS.equals:
        return item[field] === value;
      case OPERATIONS.greaterThan:
        return item[field] > parseFloat(value);
      case OPERATIONS.lessThan:
        return item[field] < parseFloat(value);
      default:
        return true; // Default to true for unknown operators
    }
  };

  // Iterate through the AND filters
  for (const orFilters of filters) {
    let orResult = false; // Initialize with false for OR logic

    const filtersToEvaluate = orFilters.filter(
      ({ isValidated, value, field, operation }) =>
        isValidated && !!value && !!field && !!operation
    );
    if (!filtersToEvaluate.length) {
      return true;
    }
    // Iterate through the OR filters
    for (const filter of filtersToEvaluate) {
      if (applyFilter(dataItem, filter)) {
        orResult = true; // If any filter in OR logic passes, set to true
        break; // No need to check other OR filters
      }
    }

    // If any OR filter passes, continue with AND logic
    if (!orResult) {
      return false; // If all OR filters fail, return false for AND logic
    }
  }

  // If all AND filters pass, return true
  return true;
};

export const getFilteredData = (
  data: ApiDataObject[],
  filters: RuleObject[][]
) => {
  if (!filters.length) {
    return data;
  }
  const filteredData = data.filter(item => applyFilters(item, filters));
  return filteredData;
};
