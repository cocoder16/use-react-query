# react-query

## 체크사항

- devtools 컴포넌트 불편 - 에러시 DOM 못그리면 사라짐
- [x] useQuery - 질의하는 메서드에 데이터 접근가능한 변수가 종속되어 있다. redux는 state 접근과 action dispatch가 분리되어있어서 편한데.
  - => queryClient.getQueryData(queryKey); 질의없이 캐시된 데이터에 접근하는 메서드
- server side state type 선언 - axios 선언 - query-keys 선언 - react query hook 메서드 선언 - 컴포넌트 레이어에서 사용 => 깔끔한 구조 정리
- [x] query keys 우아한 사용법
  - => factory https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
- 페이징, 필터 구현해보기
- CRUD 구현해서 캐싱확인하기 (to do list)
- [x] axios 빼고 써보기, 말이 server side state management지 client side state manage도 가능하지 않을까, 그리고 state 관리 라이브러리를 통일하는게 관리포인트가 줄어서 더 좋지않을까
  - => client side state를 react-query로 관리하면 안좋은 이유 https://github.com/TanStack/query/discussions/2852

```
When you're talking about global state, you do mean client state, because react-query already is a global server state manager. Call useQuery with the same key twice and you'll get the data.

while you certainly can do it, I don't think you should, for the following reasons:

1. react-query is an async state manager, and you want something synchronous. Even if you return a static value like () => 5 from the queryFn, it's still being converted to a Promise, so you'll get one render cycle where your state is loading and data is undefined. In your example, you are working around this by setting initialData and staleTime: Infinite, so the queryFn is actually never called.
2. You're opting out of all the things that react-query does for you, like refetches, because you don't have such a thing for client state.
3. Without setting cacheTime to Infinity, the entries will be garbage collected 5 minute after you unmount the last observer. Likely not what you want for client state.
```

## 장점 활용하기

### invalidate

- mutation update이후 네트워크 재요청을 하지 않고 react-query가 캐시하고 있는(queryKey를 사용) 데이터에 update를 반영하여 데이터를 불러온다, 이후 리렌더링

## 주의할 점

리렌더링할 때 refetch(api request)를 한다. 리렌더링할 떄 refetch를 막는 최적화를 해야한다.

## 사용해야할까?

react-query는 server side 상태관리 라이브러리로, client side 상태관리를 대체할 수 없다. client side 상태관리 라이브러리와 같이 사용하면 그만큼 관리포인트가 늘어난다. 전역상태를 리덕스 스토어에서만 가져올 수 있다는 규칙이 깨지고 아키텍처가 복잡해진다.

msa를 할 때, 일부 서비스에서는 client side 상태관리 부피가 극도로 적다면, react-query를 사용하면 이점이 있을 수 있다.
