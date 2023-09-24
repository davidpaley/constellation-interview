import { render, act, fireEvent } from "@testing-library/react";
import { useFilterContext } from "../hooks/useFilterContext";
import { FilterContextProvider } from "./filter-context";

describe("FilterContextProvider", () => {
  it("should provide and update fields context value", () => {
    const ChildComponent = () => {
      const { fields, setFields } = useFilterContext();

      const handleClick = () => {
        setFields(["key1", "key2"]);
      };

      return (
        <>
          <div data-testid="fields">{fields.join(",")}</div>
          <button onClick={handleClick} data-testid="update-fields-button">
            Update Fields
          </button>
        </>
      );
    };

    const { getByTestId } = render(
      <FilterContextProvider>
        <ChildComponent />
      </FilterContextProvider>
    );

    const fieldsElement = getByTestId("fields");
    const updateFieldsButton = getByTestId("update-fields-button");

    expect(fieldsElement).toHaveTextContent("");

    act(() => {
      fireEvent.click(updateFieldsButton);
    });

    expect(fieldsElement).toHaveTextContent("key1,key2");
  });

  it("should provide and update rules context value", () => {
    const ChildComponent = () => {
      const { rules, dispatch } = useFilterContext();

      const addRule = () => {
        dispatch({
          type: "add_rule",
          andIndex: 0,
          orIndex: 0,
          newRule: {
            field: "fieldName",
            operation: "equals",
            value: "someValue",
          },
        });
      };

      return (
        <>
          <div data-testid="rules">{JSON.stringify(rules)}</div>
          <button onClick={addRule} data-testid="add-rule-button">
            Add Rule
          </button>
        </>
      );
    };

    const { getByTestId } = render(
      <FilterContextProvider>
        <ChildComponent />
      </FilterContextProvider>
    );

    const rulesElement = getByTestId("rules");
    const addRuleButton = getByTestId("add-rule-button");

    expect(rulesElement).toHaveTextContent('{"data":[]}');

    act(() => {
      fireEvent.click(addRuleButton);
    });

    expect(rulesElement).toHaveTextContent(
      '{"data":[[{"field":"fieldName","operation":"equals","value":"someValue"}]]}'
    );
  });
});
