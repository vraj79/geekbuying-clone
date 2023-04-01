import { Box, FormControl, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import "../Checkout.css";

const CreditCard = () => {
  const [number, SetNumber] = useState("");
  const [name, SetName] = useState("");
  const [date, SetDate] = useState("");
  const [cvc, SetCvc] = useState("");
  const [focus, SetFocus] = useState("");

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={{ base: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
      justifyContent={"center"}
      alignItems={"center"}
      width={"80%"}
      margin={"auto"}
      mt={{ base: "2rem", md: "4rem" }}
    >
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Cards
          number={number}
          name={name}
          expiry={date}
          cvc={cvc}
          focused={focus}
        />
      </Box>
      <Box mt={{ base: 3, md: 0 }} p={2}>
        <form>
          <Box>
            <FormControl>
              <Input
                placeholder="Card Number"
                type="number"
                // className="form-control"
                value={number}
                name="number"
                maxLength={16}
                onChange={(e) => {
                  SetNumber(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></Input>
            </FormControl>
          </Box>
          <br />
          <Box>
            <FormControl>
              <Input
                placeholder="Card Name"
                type="text"
                className="form-control"
                value={name}
                name="name"
                onChange={(e) => {
                  SetName(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></Input>
            </FormControl>
          </Box>
          <br />
          <Box display={"flex"} gap={5}>
            <FormControl>
              <Input
                placeholder="Expiry"
                type="text"
                name="expiry"
                className="form-control"
                value={date}
                maxLength={4}
                onChange={(e) => {
                  SetDate(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></Input>
            </FormControl>
            <FormControl>
              <Input
                placeholder="CVV"
                type="tel"
                name="cvc"
                className="card"
                value={cvc}
                maxLength={3}
                onChange={(e) => {
                  SetCvc(e.target.value);
                }}
                onFocus={(e) => SetFocus(e.target.name)}
              ></Input>
            </FormControl>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default CreditCard;
