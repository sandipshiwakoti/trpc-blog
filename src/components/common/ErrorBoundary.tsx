import React from "react";
import { Button, Center, Heading, Image, Text, VStack } from "@chakra-ui/react";

interface ErrorBoundaryProps {
  message?: string;
  resetButtonLabel?: string;
  onReset?: () => void;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({
  message,
  resetButtonLabel,
  onReset,
}) => {
  return (
    <Center minH="100vh">
      <VStack gap="2">
        <Image src="/errorFallback.jpg" h="200" w="200" alt="Error fallback" />
        <Heading size="2xl">Oops!</Heading>
        <Heading size="xl">Something went wrong</Heading>
        <Text fontWeight="bold" color="gray.500" fontSize="xl">
          {message}
        </Text>
        {resetButtonLabel && (
          <Button
            colorScheme="blue"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            rounded="xl"
            _hover={{
              bgGradient: "linear(to-r, red.500, yellow.500)",
            }}
            onClick={onReset}
          >
            {resetButtonLabel}
          </Button>
        )}
      </VStack>
    </Center>
  );
};

export default ErrorBoundary;
