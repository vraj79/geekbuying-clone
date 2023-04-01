import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Button,
} from "@chakra-ui/react";
import { CartItem } from "./CartItem";
import { CartOrderSummary } from "./CartOrderSummary";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

export const Cart = () => {
  const cartData = useSelector((store) => store.cart);
  const navigate = useNavigate();

  if (cartData.length === 0) {
    return (
      <Box
        display={"grid"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <Box>
          <Heading as={"h2"}>Your Cart Is Empty</Heading>
          <Button display={"block"} margin={"auto"} onClick={() => navigate("/")}>
            <Link color={mode("blue.500", "blue.200")}>Continue shopping</Link>
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      maxW={{
        base: "3xl",
        lg: "7xl",
      }}
      mx="auto"
      px={{
        base: "4",
        md: "8",
        lg: "12",
      }}
      py={{
        base: "6",
        md: "8",
        lg: "24",
      }}
    >
      <Stack
        direction={{
          base: "column",
          lg: "row",
        }}
        align={{
          lg: "flex-start",
        }}
        spacing={{
          base: "8",
          md: "16",
        }}
      >
        <Stack
          spacing={{
            base: "8",
            md: "10",
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart ({cartData.length} items)
          </Heading>

          <Stack spacing="6">
            {cartData.map((item,i) => (
              <CartItem key={i} {...item} />
            ))}
          </Stack>
        </Stack>

        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link
              onClick={() => navigate("/")}
              color={mode("blue.500", "blue.200")}
            >
              Continue shopping
            </Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  );
};
