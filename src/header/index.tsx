import { Image, Text } from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";

export const Header = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
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
    </>
  );
};
