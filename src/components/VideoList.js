import React from "react";
import VideoItem from "./VideoItem";
import "./VideoList.css";

const VideoList = ({ videos, onVideoSelect }) => {
  const renderedList = videos.map((video) => {
    return <VideoItem onVideoSelect={onVideoSelect} video={video} key={video.id.videoId} />;

  });
  const noVideosFound = <h2 className="ui header">
  <i className="thumbs down outline icon"></i>
  <div className="content">
    No Videos Found
  </div>
</h2>
{/* <i className="thumbs down outline icon"></i>; */}
  return (
    <div className="video-list ui segment">
      <div className="ui relaxed divided list">{renderedList.length > 0 ? renderedList : noVideosFound}</div>
    </div>
  );
};

export default VideoList;
