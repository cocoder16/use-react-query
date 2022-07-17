import { QueryClientProvider } from "react-query";

import createQueryClient from "src/config/queryClient";

export const queryClientWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>{children}</QueryClientProvider>
);
