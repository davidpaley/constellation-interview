import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { RuleObject, RuleState, RuleAction } from "../models";

interface MyContextState {
  keys: string[];
  setKeys: React.Dispatch<React.SetStateAction<never[]>>;
  dispatch: React.Dispatch<RuleAction>;
  rules: RuleState;
}

// Create a context
const MyContext = createContext<MyContextState | undefined>(undefined);
interface MyContextProviderProps {
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
        newRuleArray = [
          ...state.data.filter((_, index) => index !== action.andIndex),
        ];
      }
      return {
        data: newRuleArray,
      };
    }
    case "delete_and_rule": {
      let newRuleArray = [
        ...state.data.filter((_, index) => index !== action.andIndex),
      ];
      return {
        data: newRuleArray,
      };
    }
  }
  throw Error("Unknown action: " + action.type);
}

const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  const [rules, dispatch] = useReducer(reducer, {
    data: [],
  } as RuleState);
  const [keys, setKeys] = useState([]);

  console.log({ rules });
  return (
    <MyContext.Provider value={{ keys, setKeys, rules, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = (): MyContextState => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }

  return context;
};

export { MyContextProvider, useMyContext };
