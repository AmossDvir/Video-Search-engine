import React from "react";
import "./SearchBar.css";
class SearchBar extends React.Component {
  state = { searchQuery: "", isValid: true };

  onInputChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    if (/\S+/.test(this.state.searchQuery)) {
      this.setState({ isValid: true });
      this.props.onFormSubmit(this.state.searchQuery);

    } else {
      this.setState({ isValid: false });
    }
  };
  render() {
    return (
      <div className="search-bar ui segment">
        <div className="main-bar ui grid">
          
          <div className="ui header img-title two wide column">
            <i className="youtube icon"></i>
            </div>
            <div className="ui header search-title four wide column">
            <label>Video Search</label>
          </div>
          <div className="eight wide column">
            <form className="ui fluid form" onSubmit={this.onFormSubmit}>
              <input
                className="prompt"
                type="text"
                placeholder="Search videos..."
                value={this.state.searchQuery}
                onChange={this.onInputChange}
              />
              {!this.state.isValid && (
                <div className="ui pointing red basic label">
                  Please enter a search term
                </div>
              )}
            </form>
          </div>
          <div className="two wide column">
            <div className="search-icon item">
              <button className="ui button" onClick={this.onFormSubmit}>
                <i className="search icon">
                  <h4 className="ui grey header">Search</h4>
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
