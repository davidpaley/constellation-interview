import { render, act, fireEvent } from "@testing-library/react";
import { MyContextProvider, useMyContext } from "./data-context";

describe("MyContextProvider", () => {
  it("should provide and update keys context value", () => {
    const ChildComponent = () => {
      const { keys, setKeys } = useMyContext();

      const handleClick = () => {
        setKeys(["key1", "key2"]);
      };

      return (
        <>
          <div data-testid="keys">{keys.join(",")}</div>
          <button onClick={handleClick} data-testid="update-keys-button">
            Update Keys
          </button>
        </>
      );
    };

    const { getByTestId } = render(
      <MyContextProvider>
        <ChildComponent />
      </MyContextProvider>
    );

    const keysElement = getByTestId("keys");
    const updateKeysButton = getByTestId("update-keys-button");

    expect(keysElement).toHaveTextContent("");

    act(() => {
      fireEvent.click(updateKeysButton);
    });

    expect(keysElement).toHaveTextContent("key1,key2");
  });

  it("should provide and update rules context value", () => {
    const ChildComponent = () => {
      const { rules, dispatch } = useMyContext();

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
      <MyContextProvider>
        <ChildComponent />
      </MyContextProvider>
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
