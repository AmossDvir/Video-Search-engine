import React from "react";
import VideoItem from "./VideoItem";
import ErrorMessage from "./utils/ErrorMessage";
import "./VideoList.css";

const VideoList = ({ videos, onVideoSelect, isLoading, isError }) => {
  const renderedList = videos.map((video) => {
    return (
      <VideoItem
        onVideoSelect={onVideoSelect}
        video={video}
        key={video.id.videoId}
      />
    );
  });
  // const sortedRenderedList =
  const noVideosFound = (
    <h2 className="ui header">
      <i className="thumbs down outline icon"></i>
      <div className="content">No Videos Found</div>
    </h2>
  );

  return !isLoading ? (
    !isError ? (
      <div className="video-list ui segment">
        <button className="ui toggle button active">Voted</button>
        <div className="ui relaxed divided list">
          {renderedList.length > 0 ? renderedList : noVideosFound}
        </div>
      </div>
    ) : (
      <ErrorMessage></ErrorMessage>
    )
  ) : (
    <div className="ui active dimmer">
      <div className="ui text loader">Loading Videos...</div>
    </div>
  );
};

export default VideoList;
