import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
  const { auth } = useSelector((store) => store);
  const { name } = auth;

  const toast=useToast();

  if (!name) {
    toast({
      title: 'Please login first',
      status: 'error',
      duration: 2000,
      isClosable: true,
    })
    return <Navigate to="/login" state={{ from: history.location }} />;
  }
  return children;
};

export default PrivateRoute;
