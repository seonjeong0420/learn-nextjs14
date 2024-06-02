# NextJS 14

**[폴더구조]**

```bash
├── app /
│   ├── layout.tsx
│   └── page.tsx
│
└── README.md
```

## Define Routes

- 폴더/page.tsx 파일이 무조건 필요하다.
- 다른 파일명의 .tsx 파일들은 url이 될 수가 없다.
- not-found.tsx : 404 페이지
- error.tsx : 404를 제외한 기타 오류 페이지
- loading.tsx : 로딩 페이지
- route.tsx : API 경로 생성 페이지

usePathName() Hook

- client component
- 클라이언트 컴포넌트를 사용하기 위해서는 파일 최상단에 'use client' 를 붙여주면 된다.

## Client Component & Server Component

**CSR**

- create-react-app
- 단점
  - UI를 렌더링 하기 위해서는 javascript가 활성화 되어 있어야 한다. (client는 javascript를 로드하고, 이후에 javascript가 UI를 빌드하기 때문)
  - SEO 최적화 할 수가 없다.

**SSR**

- next.js framework
- 페이지 안의 모든 컴포넌트들은 서버에서 render를 한다.

### Hydration

- 단순 HTML을 React Appplication으로 초기화 하는 작업
- HTML에 EventListeners를 추가하고 interactive 되어지는 과정

### 'use client' : Client Component

- client에서 interactive하게 만들어질 컴포넌트는 'use client' 지시어를 맨 위에 갖고 있는 컴포넌트 뿐이다.
- backend: render & frontend: hydrate & interative

### Server Component

- 'use client' 컴포넌트를 사용하지 않는 모든 것들
- 서버에서 먼저 render 되고, hydrate는 되지 않는다.
- useQuery, react-query, useState, useEffect 등을 사용하지 않고, data fetching이 가능..?!?

#### Server Component 안에 Client Component를 가질 수 있는가?

가능 !

#### Client Component 안에 Server Component를 가질 수 있는가?

불가능 !

- 'use client'를 사용하면 모든 children은 Client Component가 되기 때문

## Nextjs의 프로세스

1. 언제 페이지로 접속하든지 간에 사용자에게 응답이 주어지기 전에 백엔드에서 우리 어플리케이션을 pre-render.
2. 모든 컴포넌트를 가져가서 non-interactive한 html로 변환
3. 이후 사용자에게 렌더링
4. 'use client'의 여부에 따라 어떤 컴포넌트가 hydreate와 interactive 되는지 파악
   **모든 컴포넌트들은 backend에서 pre-render 되지만, client에서도 render 된다.!!**

## Layout

- 프로세스 :: `url: /about-us` 페이지 접속 시, Next.js는 바로 AboutUs 컴포넌트를 호출하는 것이 아닌 Layout 컴포넌트를 호출한 후에 AboutUs 컴포넌트를 호출한다.

- 오직 한 페이지만의 layout도 생성이 가능하다.
- app/ 자식에 layout.tsx가 있고, A폴더에도 layout.tsx 적용이 되어 있다면, A폴더의 하위 폴더에 있는 page.tsx 파일에도 app/ 의 자식 layout.tsx와 A폴더의 layout.tsx 파일 모두가 적용 된다. **(레이아웃이 상쇄되지 않고, 중첩된다 !!)**

## Metadata

[Next.js 공식문서 Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

- 향상된 SEO를 위해 Application Metadata를 정의하는데 사용할 수 있는 Metadata API가 있다.
- route groups -> 폴더 이름을 () 안에 넣어줘야 한다. url을 생성하지 않는다.
- Layout과 같이 중첩은 되지만, 병합은 되지 않는다.
- **Server Component에만** 적용할 수가 있다.

```bash
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "Loading... | NextMovies",
    template: "%s | NextMovies",
  },
  description: "Main Layout Metadata Description",
};
```

## Dynamic Routes

- 폴더명에 []를 넣고, page.tsx 파일을 만들면 된다.

## Data Fetching

```bash
"use client";

import React, { useEffect, useState } from "react";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
    const json = await response.json();

    setMovies(json);
    setIsLoading(false);
  };
  useEffect(() => {
    // data fetch
    getMovies();
  }, []);

  return (
    <div>
      <h1>Hello Next!</h1>
      {isLoading ? "loading..." : JSON.stringify(movies)}
    </div>
  );
};

export default Page;

```

- 위 코드는 client 컴포넌트에서 data fetching을 하는 예시이다. 이는 Client에서 API를 요청하고 응답하기 때문에 보안에 매우 취약하다.

```bash
import React, { useEffect, useState } from "react";

export const metadata = {
  title: "HOME",
};

const URL = "https://nomad-movies.nomadcoders.workers.dev/movies";
async function getMovies() {
  return fetch(URL).then((response) => response.json());
}
const HomePage = async () => {
  // async : 비동기 함수를 호출하기 위해서 필요

  const movies = await getMovies();
  return (
    <div>
      <h1>Hello Next!</h1>
      {JSON.stringify(movies)}
    </div>
  );
};

export default HomePage;

```

- 서버 컴포넌트에서는 useState, useEffect 없이 data fetching 을 할 수가 있다.

### Parallel Request

**Promise.all** 사용하면 함수를 병렬로 fetching 처리할 수가 있다.

```bash
async function getMovie(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

const MovieDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);

  return (
    <h1>
      MovieDetail {id}, {movie.title}
    </h1>
  );
};
```

### Suspense Component

React에서 제공해주는 컴포넌트

- 페이지를 렌더링할 때 아직 준비가 안된 경우 로딩 창을 보여줄 수 있는 기능

- movie정보와 video정보를 Promise.all() 사용하여 병렬로 Data Fetching을 했지만, 만약 movie 정보가 video정보 보다 서버에서 데이터 불러오는 시간이 빠를 경우, 사용자에게 먼저 보여주기 위해 Suspense Componnent로 각 컴포넌트를 감싸주어 사용자에게 UI를 렌더링 할 수 있다.

### Error Page

error.tsx 파일은 "use client"가 무조건 있어야 한다.
