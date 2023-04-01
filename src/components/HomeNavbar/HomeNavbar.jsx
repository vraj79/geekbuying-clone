import { HiOutlineShoppingBag } from "react-icons/hi";
import { ImUser } from "react-icons/im";
import { FiSearch } from "react-icons/fi";
import styles from "./HomeNavbar.module.css";
import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Input,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { HamburgerIcon } from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";

const HomeNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useSelector((store) => store);
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const navigate = useNavigate();
  const [username,setUsername]=useState("");
  const auth=getAuth()
  const dispatch=useDispatch();

  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
      }else{
        setUsername("")
      }
    });
  },[auth])

  const toast=useToast()

  const handleLogout=()=>{
    auth.signOut();
    toast({
      title: "Logged Out",
      position: "bottom-center",
      duration: 1000,
      status: "error",
      isClosable: true,
    });
    setTimeout(() => {
      window.location.reload();
    }, 250);
  }

  return (
    <Box position={"fixed"} width={"full"} zIndex={10}>
      <div className={styles.navbar}>
        <div
          style={{ width: "10rem" }}
          onClick={() => navigate("/")}
          className="navIcon"
        >
          <img
            src="https://content1.geekbuying.com/V1.4/en/images/indexV7/Geekbuying.png"
            alt=""
          />
        </div>
        {isDesktop ? (
          <>
            <div className={styles.navItems}>
              <Link to="/new">
                <span>New</span>
              </Link>
              <Link to="/best">
                <span>Best</span>
              </Link>
              <Link to="/brands">
                <span>Brands</span>
              </Link>
              <Link to="/clearance">
                <span>Clearance</span>
              </Link>
              <Link to="/deals">
                <span>Deals</span>
              </Link>
            </div>
            <div className={styles.navUser}>
              {/* <Input width={"max-content"} size={"xs"} type="text" /> */}
              <FiSearch size={25} />
              {username===""?<ImUser size={25} onClick={() => navigate("/login")} />:<Button onClick={handleLogout} colorScheme="cyan" size={"xs"}>{username}</Button>}
              
              {cart.length===0 ? <HiOutlineShoppingBag
                onClick={() => navigate("/cart")}
                size={25}
              /> : <Button onClick={() => navigate("/cart")} colorScheme="yellow" size={"xs"}>{cart.length}</Button>}
            </div>
          </>
        ) : (
          <Box display={["block", "block", "none"]}>
            <HamburgerIcon onClick={onOpen} boxSize={25} />
            <Drawer isOpen={isOpen}  placement="right">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton onClick={onClose} />
                <DrawerHeader><img src="data:image/png;base64,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" alt="" /></DrawerHeader>
                <DrawerBody onClick={onClose} p="10px" textAlign="left">
                  <Flex w="100%" p="10px" justify="space-around" align="center">
                    <Link
                      to="/login"
                      // onClick={onClose}
                      style={{ textDecoration: "none" }}
                      id="sign"
                    >
                      {username===""?(<Box color="#030202" fontWeight="600">SignIn</Box>):<Box onClick={handleLogout} color="#030202" fontWeight="600">{username}</Box>}
                    </Link>
                    <Link
                      to="/cart"
                      // onClick={onClose}
                      style={{ textDecoration: "none" }}
                      id="cart"
                    >
                      <Box color="#000000">
                        <AiOutlineShoppingCart
                          style={{ fontSize: "22px", fontWeight: "900" }}
                        />
                      </Box>
                    </Link>
                  </Flex>

                  <Divider />
                  <Box p="30px">
                    <Link style={{ textDecoration: "none" }} to="/new" id="new">
                      <Box color="#1a1818" p="10px 0px" fontWeight="600">
                        New
                      </Box>
                    </Link>

                    <Link
                      style={{ textDecoration: "none" }}
                      to="/best"
                      id="best"
                    >
                      <Box color="#1a1818" p="10px 0px" fontWeight="600">
                        Best
                      </Box>
                    </Link>

                    <Link
                      style={{ textDecoration: "none" }}
                      to="/brands"
                      id="deal"
                    >
                      <Box color="#1a1818" p="10px 0px" fontWeight="600">
                        Brand
                      </Box>
                    </Link>

                    <Link
                      style={{ textDecoration: "none" }}
                      to="/clearance"
                      id="clear"
                    >
                      <Box color="#1a1818" p="10px 0px" fontWeight="600">
                        Clearance
                      </Box>
                    </Link>

                    <Link
                      style={{ textDecoration: "none" }}
                      to="/deals"
                      id="coup"
                    >
                      <Box color="#1a1818" p="10px 0px" fontWeight="600">
                        Deals
                      </Box>
                    </Link>
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>
        )}
      </div>
    </Box>
  );
};

export default HomeNavbar;
