import React, { useState, createRef } from "react";
import { Collapse } from "react-bootstrap";
import "./VideoDetails.css";

const VideoDetails = ({ video, shouldOpen }) => {
  const scollToRef = createRef();
  const [open, setOpen] = useState(true);
  const videoURL = `https://www.youtube.com/embed/${video.id.videoId}`;

  const onToggleCollapse = () => {
    scollToRef.current.scrollIntoView();
    setOpen(!open);
  };

  return video ? (
    <div className="ui segment" ref={scollToRef} style={{ padding: "5px" }}>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <div className="card card-body">
            <div className="example-collapse-text ui embed">
              <iframe title="Video Player" width="40" src={videoURL}></iframe>
            </div>
            <div className="ui segment">
              <h4 className="ui header">{video.snippet.title}</h4>
              <p>{video.snippet.description}</p>
            </div>
          </div>
        </div>
      </Collapse>
      <div className="collapser" onClick={onToggleCollapse}>
        <i className={`chevron ${open?'up':'down'} icon`}></i>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default VideoDetails;
