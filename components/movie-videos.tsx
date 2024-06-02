import React from "react";
import { API_URL } from "../app/(home)/page";
import { getFontOverrideCss } from "next/dist/server/font-utils";

type Props = {
  id: string;
};

async function getVideos(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

const MovieVideos = async ({ id }: Props) => {
  const videos = await getVideos(id);
  return <h6>{JSON.stringify(videos)}</h6>;
};

export default MovieVideos;
