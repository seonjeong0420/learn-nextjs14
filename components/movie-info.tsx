import React from "react";
import { API_URL } from "../app/(home)/page";

type Props = {
  id: string;
};

export async function getMovie(id: string) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

const MovieInfo = async ({ id }: Props) => {
  const movie = await getMovie(id);
  return <h4>{JSON.stringify(movie)}</h4>;
};

export default MovieInfo;
