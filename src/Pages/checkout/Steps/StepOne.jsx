import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../../../config/firebaseConfig";
import {
    Box,
    FormControl,
    FormLabel,
    Heading,
    Input,
  } from "@chakra-ui/react";
const StepOne = () => {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setName(user.displayName);
        setEmail(user.email);
      }
    });
  }, []);
  return (
    <Box display={"grid"} gap={2} mt={3} padding={{ base: 2, md: 5 }}>
      <Heading as={"h2"} size={{ base: "md", md: "xl" }} textAlign={"center"}>
        Shipping Address
      </Heading>
      <Box display={"grid"} gap={5}>
        <FormControl isRequired>
          <FormLabel>Your Name</FormLabel>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Your Email</FormLabel>
          <Input
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Mobile Number</FormLabel>
          <Input placeholder="Mobile Number" type="tel" maxLength={10} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Shipping Address</FormLabel>
          <Input placeholder="Shipping Address" />
        </FormControl>
      </Box>
    </Box>
  );
};

export default StepOne;
