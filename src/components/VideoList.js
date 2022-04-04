import React, { useEffect, useState, createRef } from "react";
import VideoItem from "./VideoItem";
import ErrorMessage from "./utils/ErrorMessage";
import ToggleButton from "@mui/material/ToggleButton";
import RandomPickButton from "./utils/RandomPickButton";
import ShuffleButton from "./utils/ShuffleButton";
import ToolTip from "./utils/ToolTip";
import "./VideoList.css";

const VideoList = ({
  videos,
  onVideoSelect,
  isLoading,
  isError,
  onRandomClick,
}) => {

  // Set states by hooks:
  const [sortingSelected, setSortingSelected] = useState(false);
  const [renderedList, setRenderedList] = useState(videos.map((video) => {
    return (
      <VideoItem
        onVideoSelect={onVideoSelect}
        video={video}
        key={video.id.videoId}
      />
    );
  }));
  const scollToList = createRef();

  const onSorting = () => {
    scollToList.current.scrollIntoView();
    setSortingSelected(!sortingSelected);
  }

  const onShuffle = () => {
    scollToList.current.scrollIntoView();
    setSortingSelected(false);
    setRenderedList(videos.map((video) => {
      return (
        <VideoItem
          onVideoSelect={onVideoSelect}
          video={video}
          key={video.id.videoId}
        />
      );
    }).sort((a, b) => 0.5 - Math.random()));
  };



  useEffect(() => {
    sortingSelected
      ? setRenderedList(sortedRenderedList)
      : setRenderedList(videos.map((video) => {
        return (
          <VideoItem
            onVideoSelect={onVideoSelect}
            video={video}
            key={video.id.videoId}
          />
        );
      }));
  }, [sortingSelected]);

  useEffect( () => {
    setRenderedList(videos.map((video) => {
      return (
        <VideoItem
          onVideoSelect={onVideoSelect}
          video={video}
          key={video.id.videoId}
        />
      );
    }))
  },[videos])
  const toolTipMessage = "Sort Alphabetically";
  // Generate a sorting button:
  const sortButton = (
    <ToggleButton
      value={"check"}
      selected={sortingSelected}
      onChange={onSorting}
    >
      <i className="sort alphabet down icon" />
    </ToggleButton>
  );

  const sortedRenderedList = videos.map((video) => {
    return (
      <VideoItem
        onVideoSelect={onVideoSelect}
        video={video}
        key={video.id.videoId}
      />
    );
  }).sort((a, b) =>
    a.props.video.snippet.title > b.props.video.snippet.title ? 1 : -1
  );
  const noVideosFound = (
    <h2 className="ui header">
      <i className="thumbs down outline icon"></i>
      <div className="content">No Videos Found</div>
    </h2>
  );



  return !isLoading ? (
    !isError ? (
      <div className="video-list ui segment" ref={scollToList}>
        <div className="buttons ui grid">
          <div className="two wide column">
            <ToolTip
              message={toolTipMessage}
              delay={400}
              itemToHover={sortButton}
            ></ToolTip>
          </div>
          <div className="two wide column">
            <RandomPickButton
              onClick={onRandomClick}
              text={<i className="random icon"/>}
            ></RandomPickButton>
          </div>
          <div className="two wide column">
            <ShuffleButton onClick={onShuffle} text={<i className="retweet icon"/>}></ShuffleButton>
          </div>
        </div>
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
