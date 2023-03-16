import React from "react";
import { Heading, HStack, Image } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";

interface LogoProps extends BoxProps {}

const Logo: React.FC<LogoProps> = ({ ...props }) => {
  return (
    <HStack justifyContent="center" alignItems="center" {...props}>
      <Image src="https://trpc.io/img/logo.svg" h="50px" alt="Logo" />
      <Heading fontWeight="extrabold">tRPC Blog</Heading>
    </HStack>
  );
};

export default Logo;
