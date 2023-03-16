import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import { api } from "~/utils/api";
import ProtectedRoute from "~/pages/ProtectedRoute";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <ProtectedRoute>
        <Component {...pageProps} />
      </ProtectedRoute>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
