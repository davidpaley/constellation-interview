import "./App.css";
import { ChakraProvider, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Image } from "@chakra-ui/react";
import { TableWithFilters } from "./components/table-with-filters";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { MyContextProvider } from "./context/data-context";
function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <div className="App">
          <header className="App-header">
            <Image
              pointerEvents="none"
              height="40vmin"
              src="https://www.helloconstellation.com/assets/img/logo.svg"
              alt="constellation logo"
            />
            <Text
              fontSize={{
                base: "lg",
                md: "3xl",
              }}
              mt={{
                base: "20",
                md: "5",
              }}
              color="#ff8585"
            >
              Condition Builder solution
            </Text>
            <ArrowDownIcon
              onClick={scrollToBottom}
              cursor="pointer"
              mt={20}
              w={{
                base: 20,
                md: 40,
              }}
              h={{
                base: 20,
                md: 40,
              }}
              color="#ff8585"
            />
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
