# react-query

## 체크사항

- [x] devtools 컴포넌트 DOM 트리에 포함되어있어 불편 - 에러시 DOM 못그리면 사라짐
- [x] useQuery - 질의하는 메서드에 데이터 접근가능한 변수가 종속되어 있다. redux는 state 접근과 action dispatch가 분리되어있어서 편한데.
  - => queryClient.getQueryData(queryKey); 질의없이 캐시된 데이터에 접근하는 메서드
- [x] server side state type 선언 - axios 선언 - query-keys 선언 - react query hook 메서드 선언 - 컴포넌트 레이어에서 사용 -> 깔끔한 구조 정리
  - => Provider( UI(hooks 사용) <- hooks <- queryKey, query function, options function, initial data ) <- types
- [ ] test
  - setUp: Provider
  - UI: BDD
  - hooks: query 실행후 cache data를 비교하는 테스트
- [x] query keys 우아한 사용법
  - => factory https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
- [x] 페이징, 필터 구현해보기
- [x] 캐싱확인하기
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

### useInfiniteQuery

- pagination, load more(infinity scroll) 구현 편리함

### lazy query

dependent query로 구현

### invalidate

- query를 refetch한다.
- 주로 mutation onSuccess에서 사용한다.

### optimistic update

mutation이 성공되었다고 치고 UI를 먼저 반영하는 업데이트. 만약 mutation 실패하면 onError에서 롤백한다.

## 주의할 점

1. refetch(api request)를 하는 경우들이 잦다. refetch를 막는 최적화를 이것저것 해야한다. (아직 모든 것을 파악 못함)
2. 기본 config 설정으로 지원하는 기능들이 많다. (retry, refetch 등등) 이런 설정들에 대해 미리 다 파악하고 있어야 예상치 못한 시나리오를 막을 수 있다. <br />
   (처음에 사용하기 쉽지는 않다.)
3. InfiniteData는 독자적인 자료구조를 가지기 때문에, 같은 도메인 같은 데이터를 다른 자료구조로 중복 저장 및 관리할 여지가 생긴다.

## 사용해야할까?

### 상태관리 라이브러리 대체?

react-query는 server side 상태관리 라이브러리로, client side 상태관리를 대체할 수 없다. client side 상태관리 라이브러리와 같이 사용하면 그만큼 관리포인트가 늘어난다. 전역상태를 리덕스 스토어에서만 가져올 수 있다는 규칙이 깨지고 아키텍처가 복잡해진다.

msa를 할 때, 일부 서비스에서는 client side 상태관리를 하지 않는다면, react-query를 사용하면 이점이 있을 수 있다.

하나의 도메인에 대해 client side state와 server side state 모두 관리가 필요한 경우, 데이터 저장 계층을 분산하기보다는 하나의 상태관리 라이브러리를 사용하는 것이 낫다.
