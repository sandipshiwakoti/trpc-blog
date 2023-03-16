import React from "react";
import { Center, Spinner } from "@chakra-ui/react";
import type { SpinnerProps } from "@chakra-ui/react";

interface FullSpinnerProps extends SpinnerProps {}

const FullSpinner: React.FC<FullSpinnerProps> = ({ ...props }) => {
  return (
    <Center minH="100vh">
      <Spinner size="lg" {...props} />
    </Center>
  );
};

export default FullSpinner;
