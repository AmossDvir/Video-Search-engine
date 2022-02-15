import React from "react";
import "./VideoItem.css";
const VideoItem = ({ video, onVideoSelect }) => {
  const URL = "https://www.youtube.com/watch?v=" + video.id.videoId;
  return (
    <div onClick={ () => onVideoSelect(video) } className="video-item item">
      <img className="ui image" src={video.snippet.thumbnails.medium.url} alt={video.snippet.title}></img>
      <div className="content">
        <div className="header">{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
