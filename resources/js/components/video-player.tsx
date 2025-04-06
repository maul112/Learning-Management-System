// components/VideoPlayer.tsx
import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  width?: string;
  light?: boolean | string; // bisa true untuk thumbnail dari video, atau URL gambar
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  width = '100%',
  light = false,
}) => {
  return (
    <div className="aspect-video w-full rounded-lg overflow-hidden relative">
      <ReactPlayer
        url={url}
        width={width}
        height={"80vh"}
        controls
        light={light}
        className="absolute top-0 left-0"
      />
    </div>
  );
};

export default VideoPlayer;
