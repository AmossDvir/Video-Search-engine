import React, { useState } from "react";
import VideoItem from "./VideoItem";
import ErrorMessage from "./utils/ErrorMessage";
import ToggleButton from "@mui/material/ToggleButton";
import "./VideoList.css";
import ToolTip from "./utils/ToolTip";

const VideoList = ({ videos, onVideoSelect, isLoading, isError }) => {
  // Set states by hooks: 
  const [sortingSelected, setSortingSelected] = useState(false);

  const toolTipMessage = "Sort Alphabetically"
  // Generate a sorting button: 
  const sortButton = (<ToggleButton
    value={"check"}
    selected={sortingSelected}
    onChange={() => {
      setSortingSelected(!sortingSelected);
    }}
  >
    <i className="sort alphabet down icon"/>
  </ToggleButton>);


  const renderedList = videos.map((video) => {
    return (
      <VideoItem
        onVideoSelect={onVideoSelect}
        video={video}
        key={video.id.videoId}
      />
    );
  });
  const sortedRenderedList = [...renderedList].sort( (a, b) => a.props.video.snippet.title > b.props.video.snippet.title ? 1 : -1 )
  const noVideosFound = (
    <h2 className="ui header">
      <i className="thumbs down outline icon"></i>
      <div className="content">No Videos Found</div>
    </h2>
  );

  return !isLoading ? (
    !isError ? (
      <div className="video-list ui segment">
        <ToolTip message={toolTipMessage} delay={400} itemToHover={sortButton}></ToolTip>
        <div className="ui relaxed divided list">
          {renderedList.length > 0 ? sortingSelected ? sortedRenderedList : renderedList : noVideosFound}
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
