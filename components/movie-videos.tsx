import React from "react";
import { API_URL } from "../app/(home)/page";
import styles from "../styles/movie-videos.module.css";

type Props = {
  id: string;
};

async function getVideos(id: string) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
}

const MovieVideos = async ({ id }: Props) => {
  const videos = await getVideos(id);
  console.log(videos);

  return (
    <div className={styles.container}>
      {videos.map((video) => (
        <iframe
          key={video.id}
          src={`https://youtube.com/embed/${video.key}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.name}
        />
      ))}
    </div>
  );
};

export default MovieVideos;
