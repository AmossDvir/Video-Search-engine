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
    isError:false,
  };
  onQuerySubmit = async (query) => {
    this.setState({ isSelected: false, isLoading: true });
    await youtube
      .get("/search", {
        params: { q: query },
      })
      .then((response) => this.setState({ isLoading: false, videos: response.data.items ?? []}))
      .catch(() => this.setState({ isLoading:false, isError: true }));
    
    this.setState({ isSubmitted: true });
  };

  onIconClick = () => {
    this.setState({
      videos: [],
      isSubmitted: false,
      isSelected: false,
      selectedVideo: null,
      isLoading: false,
      isError: false,
    });
  };

  onVideoSelect = (video) => {
    this.scollToRef.current.scrollIntoView();
    this.setState({ isSelected: true, selectedVideo: video });
  };
  render() {
    return (
      <div className="ui container">
        <SearchBar
          className="search-bar"
          onFormSubmit={this.onQuerySubmit}
          onIconClick={this.onIconClick}
        />
        {this.state.isSubmitted && (
          <label className="videos-found">
            {`${this.state.videos.length} Video${
              this.state.videos.length === 1 ? "" : "s"
            } Found`}
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
            isLoading={this.state.isLoading}
            isError={this.state.isError}
          ></VideoList>
        )}
      </div>
    );
  }
}

export default App;
