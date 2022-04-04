import React, { createRef } from "react";
import SearchBar from "./SearchBar";
import youtube from "../apis/youtube";
import VideoList from "./VideoList";
import VideoDetails from "./VideoDetails";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.scollToList = createRef();
    this.scollToTop = createRef();
    window.addEventListener("scroll", this.onToggleScrollButtonVisible);
  }
  state = {
    videos: [],
    isSubmitted: false,
    isSelected: false,
    selectedVideo: null,
    isLoading: false,
    isError: false,
    scrollTopButtonVisible: false,
  };

  onToggleScrollButtonVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    scrolled > 300
      ? this.setState({ scrollTopButtonVisible: true })
      : this.setState({ scrollTopButtonVisible: false });
  };

  onQuerySubmit = async (query) => {
    this.setState({ isSelected: false, isLoading: true });
    await youtube
      .get("/search", {
        params: { q: query },
      })
      .then((response) =>
        this.setState({ isLoading: false, videos: response.data.items ?? [] })
      )
      .catch(() => this.setState({ isLoading: false, isError: true }));

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
    this.scollToList.current.scrollIntoView();
    this.setState({ isSelected: true, selectedVideo: video });
  };

  onRandomClick = () => {
    this.scollToList.current.scrollIntoView();

    let videosCount = this.state.videos.length;
    let randomVideo =
      this.state.videos[Math.floor(Math.random() * videosCount)];
    while (randomVideo.id.videoId === this.state.selectedVideo?.id.videoId) {
      randomVideo = this.state.videos[Math.floor(Math.random() * videosCount)];
    }
    this.setState({ isSelected: true, selectedVideo: randomVideo });
  };
  render() {
    return (
      <div className="ui container" ref={this.scollToTop}>
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
        <div className="eleven wide column" ref={this.scollToList}>
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
            onRandomClick={this.onRandomClick}
          ></VideoList>
        )}
        {this.state.scrollTopButtonVisible && (
          <div
            className="scroll-top"
            
          >
            <i 
            className="arrow circle up icon" 
            onClick={() => this.scollToTop.current.scrollIntoView()} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
