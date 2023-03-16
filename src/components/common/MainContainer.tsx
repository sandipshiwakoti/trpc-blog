import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import React from "react";

interface MainContainerProps extends BoxProps {
  children: React.ReactNode;
}
const MainContainer: React.FC<MainContainerProps> = ({
  children,
  ...restProps
}) => {
  return (
    <Box bg="gray.100" {...restProps}>
      {children}
    </Box>
  );
};

export default MainContainer;
