import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "../../styles/home.module.css";
import Movie from "../../components/movie";

export const metadata = {
  title: "HOME",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  return fetch(API_URL).then((response) => response.json());
}

const HomePage = async () => {
  // async : 비동기 함수를 호출하기 위해서 필요

  const movies = await getMovies();
  return (
    <div className={styles.container}>
      {/* {JSON.stringify(movies)} */}
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
        />
      ))}
    </div>
  );
};

export default HomePage;
