import React from "react";
import { API_URL } from "../app/(home)/page";

type Props = {
  id: string;
};

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

const MovieVideos = async ({ id }: Props) => {
  const videos = await getVideos(id);
  return <h6>{JSON.stringify(videos)}</h6>;
};

export default MovieVideos;
