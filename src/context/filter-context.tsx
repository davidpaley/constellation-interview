import React, { createContext, ReactNode, useReducer, useState } from "react";
import { RuleObject, RuleState, RuleAction } from "../models";

export interface FilterContextState {
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
  dispatch: React.Dispatch<RuleAction>;
  rules: RuleState;
}

// Create a context
export const FilterContext = createContext<FilterContextState | undefined>(
  undefined
);
interface FilterContextProviderProps {
  children: ReactNode;
}

function reducer(state: RuleState, action: RuleAction): RuleState {
  switch (action.type) {
    case "add_rule": {
      if (!state.data[action.andIndex]) {
        // adding rule in an empty or array
        return {
          data: [
            ...state.data,
            [
              {
                ...action.newRule,
              } as RuleObject,
            ],
          ],
        };
      }
      const newRuleArray = [...state.data];
      const orArray = [...newRuleArray[action.andIndex]];
      orArray[action.orIndex as number] = {
        ...action.newRule,
      } as RuleObject;
      newRuleArray[action.andIndex] = orArray;
      return {
        data: newRuleArray,
      };
    }
    case "delete_or_rule": {
      let newRuleArray = [...state.data];
      const orArray = [...newRuleArray[action.andIndex]];
      newRuleArray[action.andIndex] = orArray.filter(
        (_, index) => index !== action.orIndex
      );
      if (!newRuleArray[action.andIndex].length) {
        newRuleArray = state.data.filter(
          (_, index) => index !== action.andIndex
        );
      }
      return {
        data: newRuleArray,
      };
    }
    case "delete_and_rule": {
      let newRuleArray = state.data.filter(
        (_, index) => index !== action.andIndex
      );
      return {
        data: newRuleArray,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

const FilterContextProvider: React.FC<FilterContextProviderProps> = ({
  children,
}) => {
  const [rules, dispatch] = useReducer(reducer, {
    data: [],
  } as RuleState);
  const [fields, setFields] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ fields, setFields, rules, dispatch }}>
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContextProvider };
