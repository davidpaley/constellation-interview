import React, {
  createContext,
  ReactNode,
  Reducer,
  useContext,
  useReducer,
  useState,
} from "react";
import { RuleObject, RuleState, RuleAction } from "../models";

interface MyContextState {
  keys: string[];
  setKeys: React.Dispatch<React.SetStateAction<never[]>>;
  dispatch: React.Dispatch<RuleAction>;

  // onRulesChange: (
  //   ruleObject: RuleObject,
  //   orIndex: number,
  //   andIndex: number
  // ) => void;
  // TODO: change any
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
          data: [...state.data, [{ ...(action.newRule as RuleObject) }]],
        };
      }
      const newRuleArray = [...state.data];
      const orArray = [...newRuleArray[action.andIndex]];
      orArray[action.orIndex as number] = action.newRule as RuleObject;
      newRuleArray[action.andIndex] = orArray;
      return {
        data: newRuleArray,
      };
    }
    case "delete_or_rule": {
      const newRuleArray = [...state.data];
      const orArray = [...newRuleArray[action.andIndex]];
      newRuleArray[action.andIndex] = orArray.filter(
        (_, index) => index !== action.orIndex
      );
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
// Create a context provider component
const MyContextProvider: React.FC<MyContextProviderProps> = ({ children }) => {
  // const [rules, setRules] = useState({});
  const [rules, dispatch] = useReducer(reducer, { data: [] } as RuleState);

  // <(state: RuleState, action: RuleAction) => RuleState, RuleState>
  const [keys, setKeys] = useState([]);

  // const onRulesChange = (
  //   ruleObject: RuleObject,
  //   orIndex: number,
  //   andIndex: number
  // ) => {
  //   console.log("on rules change");
  // };

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
