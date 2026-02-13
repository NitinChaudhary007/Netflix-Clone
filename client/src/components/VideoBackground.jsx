import React from "react";

export default function VideoBackground() {
  return (
    <div className="w-screen">
      <iframe
        className="w-screen aspect-video"
        src="https://www.youtube.com/embed/6cWp9zVu28s?si=82kkuj36_Z0UiBaj&amp;start=1&autoplay=1&mute=1"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
  );
}
