import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StepThree = () => {
  //   const OverlayOne = () => (
  //     <ModalOverlay
  //       bg="blackAlpha.300"
  //       backdropFilter="blur(10px) hue-rotate(90deg)"
  //     />
  //   );

  const OverlayTwo = () => (
    <ModalOverlay
      bg="none"
      backdropFilter="auto"
      backdropInvert="80%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(null);

  useEffect(() => {
    setOverlay(<OverlayTwo />);
    onOpen();
  }, []);

  const navigate = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const handleOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Product Ordered Successfully",
        description: "It will reach u soon.Thank You",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
      window.location.reload();
    }, 2500);
  };

  return (
    <>
      {/* <Button
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Use Overlay one
      </Button>
      <Button
        ml="4"
        onClick={() => {
          
        }}
      >
        Use Overlay two
      </Button> */}
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Do you want to confirm your Order?</ModalHeader>
          <ModalCloseButton />
          {/* <ModalBody>
            <Text></Text>
          </ModalBody> */}
          <ModalFooter display={"flex"} gap={3}>
            <Button
              colorScheme="whatsapp"
              isLoading={loading}
              loadingText="Processing"
              onClick={handleOrder}
            >
              Yes
            </Button>{" "}
            <Button
              colorScheme="yellow"
              onClick={() => (onClose(), navigate("/cart"))}
            >
              Review Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StepThree;
