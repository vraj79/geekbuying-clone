import {
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue as mode,
  useToast,
} from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { formatPrice } from "./PriceTag";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderSummaryItem = (props) => {
  const { label, value, children } = props;
  return (
    <Flex justify="space-between" fontSize="sm">
      <Text fontWeight="medium" color={mode("gray.600", "gray.400")}>
        {label}
      </Text>
      {value ? <Text fontWeight="medium">{value}</Text> : children}
    </Flex>
  );
};

export const CartOrderSummary = () => {
  const loginData = useSelector((store) => store.auth);
  console.log(loginData);

  const { cart } = useSelector((store) => store);

  const totalCost = cart
    .map((ele) => ele.qty * ele.SalePrice)
    .reduce((acc, i) => acc + i, 0);

  const navigate = useNavigate();
  const toast = useToast();

  const handleCheckout = () => {
    // if (loginData.name === null) {
    //   toast({
    //     title: "Please login first",
    //     position: "bottom-center",
    //     duration: 1000,
    //     status: "warning",
    //     isClosable: true,
    //   });
    // } else {
      navigate("/checkout");
    // }
  };

  return (
    <Stack spacing="8" borderWidth="1px" rounded="lg" padding="8" width="full">
      <Heading size="md">Order Summary</Heading>
      <Stack spacing="6">
        <OrderSummaryItem label="Subtotal" value={formatPrice(totalCost)} />
        <OrderSummaryItem label="Shipping + Tax">
          <Link href="#" textDecor="underline">
            Calculate shipping
          </Link>
        </OrderSummaryItem>
        <OrderSummaryItem label="Coupon Code">
          <Link href="#" textDecor="underline">
            Add coupon code
          </Link>
        </OrderSummaryItem>
        <Flex justify="space-between">
          <Text fontSize="lg" fontWeight="semibold">
            Total
          </Text>
          <Text fontSize="xl" fontWeight="extrabold">
            {formatPrice(totalCost)}
          </Text>
        </Flex>
      </Stack>
      <Button
        onClick={handleCheckout}
        colorScheme="blue"
        size="lg"
        fontSize="md"
        rightIcon={<FaArrowRight />}
      >
        Checkout
      </Button>
    </Stack>
  );
};
