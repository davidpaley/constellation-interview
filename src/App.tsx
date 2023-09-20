import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Image } from "@chakra-ui/react";
import { TableWithFilters } from "./components/table-with-filters";
import { ArrowDownIcon } from "@chakra-ui/icons";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">
          <header className="App-header">
            <Image
              src="https://www.helloconstellation.com/assets/img/logo.svg"
              alt="constellation logo"
              className="App-logo"
            />
            <p className="App-subtitle">Condition Builder solution</p>
            <ArrowDownIcon mt={20} w={40} h={40} color="#ff8585" />
          </header>
          <TableWithFilters />
        </div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
