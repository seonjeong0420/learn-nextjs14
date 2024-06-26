import React, { Suspense } from "react";
import MovieVideos from "../../../../components/movie-videos";
import MovieInfo, { getMovie } from "../../../../components/movie-info";

interface IParams {
  params: { id: string };
}

export const generateMetadata = async ({ params: { id } }: IParams) => {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
};

const MovieDetail = async ({ params: { id } }: IParams) => {
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
