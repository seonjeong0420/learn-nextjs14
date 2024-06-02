import Link from "next/link";
import React, { useEffect, useState } from "react";

export const metadata = {
  title: "HOME",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  await new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, 2000);
    } catch {
      console.log("error...", reject);
    }
  });
  return fetch(API_URL).then((response) => response.json());
}
const HomePage = async () => {
  // async : 비동기 함수를 호출하기 위해서 필요

  const movies = await getMovies();
  return (
    <div>
      <h1>Hello Next!</h1>
      {/* {JSON.stringify(movies)} */}
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
};

export default HomePage;
