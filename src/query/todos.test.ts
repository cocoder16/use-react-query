import { renderHook } from "@testing-library/react-hooks";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { queryClientWrapper } from "src/utils/setUpTest";
import { useGetTodos, initialData } from "./todos";

describe("useGetTodos", () => {
  test("get todos from api", async () => {
    const mock = new MockAdapter(axios, { delayResponse: 100 });
    const responseData = [
      {
        id: 0,
        content: "js",
        done: true,
      },
      {
        id: 1,
        content: "css",
        done: false,
      },
      {
        id: 2,
        content: "html",
        done: false,
      },
    ];
    mock.onGet("http://localhost:3000/api/todos").reply(200, {
      data: responseData,
    });
    const { result, waitFor } = renderHook(() => useGetTodos(), { wrapper: queryClientWrapper });

    await waitFor(() => result.current.isFetched);

    expect(result.current.data).toEqual(responseData);
  });

  test("data should be initialData, when api request failed", async () => {
    const mock = new MockAdapter(axios, { delayResponse: 100 });
    mock.onGet("http://localhost:3000/api/todos").reply(500);

    const { result, waitFor } = renderHook(() => useGetTodos(), { wrapper: queryClientWrapper });

    await waitFor(() => result.current.failureCount > 0);

    expect(result.current.data).toEqual(initialData.all);
  });
});
