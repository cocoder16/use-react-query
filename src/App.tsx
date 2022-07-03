import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>Hi</div>
      <ReactQueryDevtoolsPanel
        setIsOpen={function (isOpen: boolean): void {
          throw new Error("Function not implemented.");
        }}
        handleDragStart={function (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
          throw new Error("Function not implemented.");
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
