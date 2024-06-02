"use client";

import Link from "next/link";
import React from "react";
import styles from "../styles/movie.module.css";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  id: string;
  poster_path: string;
};

const Movie = ({ title, id, poster_path }: Props) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };
  return (
    <div key={id} className={styles.movie}>
      <img src={poster_path} alt={title} onClick={() => onClick} />
      <Link href={`/movies/${id}`}>{title}</Link>
    </div>
  );
};

export default Movie;
