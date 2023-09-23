import "./App.css";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Image } from "@chakra-ui/react";
import { TableWithFilters } from "./components/table-with-filters";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { MyContextProvider } from "./context/data-context";
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
          <MyContextProvider>
            <TableWithFilters />
          </MyContextProvider>
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
