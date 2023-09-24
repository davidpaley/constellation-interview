import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TableWithFilters } from "./components/table-with-filters";
import { FilterContextProvider } from "./context/filter-context";
import { Header } from "./header";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
          <FilterContextProvider>
            <TableWithFilters />
          </FilterContextProvider>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
