import { useContext } from "react";
import { FilterContext, FilterContextState } from "../context/filter-context";

export const useFilterContext = (): FilterContextState => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterContextProvider"
    );
  }

  return context;
};
