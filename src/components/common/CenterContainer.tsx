import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import React from "react";

interface CenterContainerProps extends BoxProps {
  children: React.ReactNode;
}
const CenterContainer: React.FC<CenterContainerProps> = ({
  children,
  ...restProps
}) => {
  return (
    <Box maxW="1170px" mx="auto" {...restProps}>
      {children}
    </Box>
  );
};

export default CenterContainer;
