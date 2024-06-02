import React, { Suspense } from "react";
import { API_URL } from "../../../(home)/page";
import MovieVideos from "../../../../components/movie-videos";
import MovieInfo from "../../../../components/movie-info";

const MovieDetail = async ({ params: { id } }: { params: { id: string } }) => {
  return (
    <div>
      {/* 둘다 asyc 컴포넌트이ㅣ므로, Suspense 컴포넌트로 감싸서 await 해주어야 한다.
      Suspense : React에서 제공하는 컴포넌트
      */}
      <Suspense fallback={<h1>Loading Movie info</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading Movie video</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
};

export default MovieDetail;
