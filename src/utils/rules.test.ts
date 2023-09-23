import { OPERATIONS } from "../constants";
import { ApiDataObject, RuleObject } from "../models";
import { applyFilters, getFilteredData } from "./rules";

describe("applyFilters Function", () => {
  const dataItem: ApiDataObject = {
    name: "abcdefg",
    age: 2000,
  };
  it("should return true for 'contains' operation", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.contain,
          value: "a",
          isValidated: true,
        },
        {
          field: "name",
          operation: OPERATIONS.contain,
          value: "b",
          isValidated: true,
        },
      ],
    ];
    expect(applyFilters(dataItem, filters)).toBe(true);
  });

  it("should return false for 'contains' operation", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.contain,
          value: "x",
          isValidated: true,
        },
        {
          field: "name",
          operation: OPERATIONS.contain,
          value: "y",
          isValidated: true,
        },
      ],
    ];
    expect(applyFilters(dataItem, filters)).toBe(false);
  });

  // TODO: Add more test cases for other operations (greaterThan, lessThan) and edge cases.
  it("should return true when 'notContain' operation does not contain the value", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.notContain,
          value: "x",
          isValidated: true,
        },
      ],
    ];
    expect(applyFilters(dataItem, filters)).toBe(true);
  });

  it("should return false when 'notContain' operation contains the value", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.notContain,
          value: "a",
          isValidated: true,
        },
      ],
    ];
    expect(applyFilters(dataItem, filters)).toBe(false);
  });

  it("should return true when 'regex' operation matches the pattern", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.regex,
          value: "^[a-c]",
          isValidated: true,
        },
      ],
    ];
    expect(applyFilters(dataItem, filters)).toBe(true);
  });

  it("should return false when 'regex' operation does not match the pattern", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.regex,
          value: "^[x-z]",
          isValidated: true,
        },
      ],
    ];
    expect(applyFilters(dataItem, filters)).toBe(false);
  });

  // TODO: test cases with missing or invalid fields, operations, or values.
});

describe("getFilteredData Function", () => {
  const testData: ApiDataObject[] = [
    { name: "abc", age: 1000 },
    { name: "xyz", age: 2000 },
    { name: "def", age: 3000 },
  ];

  it("should return all data when no filters are provided", () => {
    const filters: RuleObject[][] = [];
    const filteredData = getFilteredData(testData, filters);
    expect(filteredData).toEqual(testData);
  });

  it("should return filtered data for 'contains' operation", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.contain,
          value: "a",
          isValidated: true,
        },
      ],
    ];
    const expectedFilteredData = [{ name: "abc", age: 1000 }];
    const filteredData = getFilteredData(testData, filters);
    expect(filteredData).toEqual(expectedFilteredData);
  });

  // TODO: Add more test cases for different filter combinations, including edge cases.
  it("should return filtered data for 'notContain' operation", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.notContain,
          value: "x",
          isValidated: true,
        },
      ],
    ];
    const expectedFilteredData = [
      { name: "abc", age: 1000 },
      { name: "def", age: 3000 },
    ];
    const filteredData = getFilteredData(testData, filters);
    expect(filteredData).toEqual(expectedFilteredData);
  });

  it("should return filtered data for 'regex' operation", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.regex,
          value: "^[a-c]",
          isValidated: true,
        },
      ],
    ];
    const expectedFilteredData = [{ name: "abc", age: 1000 }];
    const filteredData = getFilteredData(testData, filters);
    expect(filteredData).toEqual(expectedFilteredData);
  });
  it("should return filtered data for 'equals' operation", () => {
    const filters: RuleObject[][] = [
      [
        {
          field: "name",
          operation: OPERATIONS.equals,
          value: "xyz",
          isValidated: true,
        },
      ],
    ];
    const expectedFilteredData = [{ name: "xyz", age: 2000 }];
    const filteredData = getFilteredData(testData, filters);
    expect(filteredData).toEqual(expectedFilteredData);
  });
});
