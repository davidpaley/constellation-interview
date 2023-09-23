import { ReactNode } from "react";
import { render, act, fireEvent } from "@testing-library/react";
import { Table } from "./index";
import { MyContextProvider, useMyContext } from "../../context/data-context";

const TEST_IDS = {
  updateKeys: "update-keys-button",
  addRuleWithData: "add-rule-with-data-button",
  addRuleWithoutData: "add-rule-without-data-button",
};

const data = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
];

const ChildComponent = () => {
  const { setKeys, dispatch } = useMyContext();

  const handleClick = () => {
    setKeys(["id", "name"]);
  };
  const addRule = () => {
    dispatch({
      type: "add_rule",
      andIndex: 0,
      orIndex: 0,
      newRule: {
        field: "name",
        operation: "equals",
        value: "Jane",
      },
    });
  };
  const addRuleWithoutData = () => {
    dispatch({
      type: "add_rule",
      andIndex: 0,
      orIndex: 0,
      newRule: {
        field: "name",
        operation: "equals",
        value: "pepe",
        isValidated: true,
      },
    });
  };

  return (
    <>
      <button onClick={handleClick} data-testid="update-keys-button">
        Update Keys
      </button>
      <button onClick={addRule} data-testid="add-rule-with-data-button">
        Add Rule with data
      </button>
      <button
        onClick={addRuleWithoutData}
        data-testid="add-rule-without-data-button"
      >
        Add Rule without data
      </button>
    </>
  );
};

const CustomContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <MyContextProvider>
      <ChildComponent />
      {children}
    </MyContextProvider>
  );
};

describe("Table", () => {
  it("should render loading skeleton when isLoading is true", () => {
    const { getByTestId } = render(
      <CustomContextProvider>
        <Table data={[]} isLoading={true} />
      </CustomContextProvider>
    );
    const skeleton = getByTestId("loading-skeleton");

    expect(skeleton).toBeInTheDocument();
  });

  it('should render "No data" message when data is empty', () => {
    const { getByText } = render(
      <CustomContextProvider>
        <Table data={[]} isLoading={false} />
      </CustomContextProvider>
    );
    const noDataMessage = getByText("No data");

    expect(noDataMessage).toBeInTheDocument();
  });

  it('should render "Error fetching data', () => {
    const { getByText } = render(
      <CustomContextProvider>
        <Table
          data={[]}
          isLoading={false}
          error={{
            message: "timeout exceeded",
            name: "AxiosError",
            code: "ECONNABORTED",
          }}
        />
      </CustomContextProvider>
    );
    const errorDataMessage = getByText("Error fetching data");

    expect(errorDataMessage).toBeInTheDocument();
  });

  it('should render "No data for those filters" message when filteredData is empty', () => {
    const { getByText, getByTestId } = render(
      <CustomContextProvider>
        <Table data={data} isLoading={false} />
      </CustomContextProvider>
    );
    const addKeysButton = getByTestId(TEST_IDS.updateKeys);

    act(() => {
      fireEvent.click(addKeysButton);
    });
    const addRuleButton = getByTestId(TEST_IDS.addRuleWithoutData);

    act(() => {
      fireEvent.click(addRuleButton);
    });

    const noDataForFiltersMessage = getByText("No data for those filters");

    expect(noDataForFiltersMessage).toBeInTheDocument();
  });

  it("should render the table with data and keys when data is available", () => {
    const keys = ["id", "name"];
    const { getByText, getAllByText, getByTestId } = render(
      <CustomContextProvider>
        <Table data={data} isLoading={false} />
      </CustomContextProvider>
    );
    const addKeysButton = getByTestId(TEST_IDS.updateKeys);

    act(() => {
      fireEvent.click(addKeysButton);
    });
    const addRuleButton = getByTestId(TEST_IDS.addRuleWithData);

    act(() => {
      fireEvent.click(addRuleButton);
    });

    keys.forEach(key => {
      const header = getByText(key);
      expect(header).toBeInTheDocument();
    });

    data.forEach(item => {
      Object.values(item).forEach(value => {
        const cell = getAllByText(value.toString());
        expect(cell.length).toBeGreaterThan(0);
      });
    });
  });
});
