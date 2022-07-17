import { QueryClientProvider } from "react-query";
import { ReactQueryDevtoolsPanel } from "react-query/devtools";

import createQueryClient from "src/config/queryClient";
import Users from "src/components/users";
import ToDos from "src/components/todos";

function App() {
  return (
    <QueryClientProvider client={createQueryClient()}>
      <div>Hi</div>
      <Users />
      <ToDos />
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
