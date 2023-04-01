import React, { useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import "./checkout.css";
import CreditCard from "./Steps/CreditCard";
import StepOne from "./Steps/StepOne";
import StepThree from "./Steps/StepThree";

const StepProgressBar = () => {
  const [step, setStep] = useState(1);
  

  return (
    <>
      <ProgressBar percent={((step - 1) * 100) / 2}>
        <Step transition="scale">{({}) => <div className="step">Details</div>}</Step>
        <Step transition="scale">{({}) => <div className="step">Payment</div>}</Step>
        <Step transition="scale">{({}) => <div className="step">Success</div>}</Step>
      </ProgressBar>
      {step === 1 && <StepOne />}
      {step === 2 && 
      (
      <Box>
        <CreditCard/>
      </Box>
      )
      }
      {step === 3 && <StepThree/>}

      {step!=3 && (<Box display={"flex"} justifyContent={"space-between"} padding={5} gap={3}>
        <Button
          isDisabled={step === 1}
          onClick={() => setStep(step - 1)}
          colorScheme="whatsapp"
        >
          PREV
        </Button>
        <Button onClick={() => setStep(step + 1)} colorScheme="whatsapp">
          {step === 3 ? "ORDER" : "NEXT"}
        </Button>
      </Box>)}
    </>
  );
};

export default StepProgressBar;
