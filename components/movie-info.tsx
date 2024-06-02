import React from "react";
import { API_URL } from "../app/(home)/page";

type Props = {
  id: string;
};

async function getMovie(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  throw new Error("something Broke");

  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

const MovieInfo = async ({ id }: Props) => {
  const movies = await getMovie(id);
  return <h4>{JSON.stringify(movies)}</h4>;
};

export default MovieInfo;
