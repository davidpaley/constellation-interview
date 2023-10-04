import { OPERATIONS } from "../constants";
import { ApiDataObject, RuleObject } from "../models";

export const applyFilters = (
  dataItem: ApiDataObject,
  filters: RuleObject[][]
) => {
  // Function to apply an individual filter
  const applyFilter = (item: ApiDataObject, filter: RuleObject): boolean => {
    const { field, operation, value } = filter;
    if (!filter.isValidated || !field || !value) {
      throw new Error("Trying to evaluate an incorrect filter");
    }
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
  return filters.every(orFilters => {
    const filtersToEvaluate = orFilters.filter(
      ({ isValidated, value, field, operation }) =>
        isValidated && !!value && !!field && !!operation
    );
    return (
      !filtersToEvaluate.length ||
      filtersToEvaluate.some(filter => applyFilter(dataItem, filter))
    );
  });
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
