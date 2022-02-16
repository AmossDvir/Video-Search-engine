import React from "react";
import "./ErrorMessage.css"
const ErrorMessage = () => {
  return (
      <div className="main-cont">
    <h2 className="ui icon header">
      <i className="thumbs down icon"></i>
      <div className="content">
        Something went wrong...
        <div className="sub header">
        Please check your internet connection
        </div>
      </div>
    </h2>
    </div>
  );
};
export default ErrorMessage;
