import React, { createRef } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetails from "./VideoDetails";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.scollToRef = createRef();
  }
  state = {
    videos: [],
    isSubmitted: false,
    isSelected: false,
    selectedVideo: null,
    isLoading: false,
  };
  onQuerySubmit = async (query) => {
    this.setState({ isSelected: false, isLoading: true });
    const response = await youtube.get("/search", {
      params: { q: query },
    });
    this.setState({ videos: response.data.items, isSubmitted: true });
  };



  onVideoSelect = (video) => {
    this.scollToRef.current.scrollIntoView();
    this.setState({ isSelected: true, selectedVideo: video });
  };
  render() {
    return (
      <div className="ui container">
        <SearchBar className="search-bar" onFormSubmit={this.onQuerySubmit} />
        {this.state.isSubmitted && (
          <label className="videos-found">{`${this.state.videos.length} Video${this.state.videos.length === 1 ? '': "s"} Found`}
          </label>
        )}
        <div className="eleven wide column" ref={this.scollToRef}>
          {this.state.isSelected && (
            <VideoDetails
              className="video-details"
              video={this.state.selectedVideo}
              shouldOpen={true}
            ></VideoDetails>
          )}
        </div>
        {this.state.isSubmitted && (
          <VideoList
            onVideoSelect={this.onVideoSelect}
            videos={this.state.videos}
          ></VideoList>
        )}

      </div>
    );
  }
}

export default App;
