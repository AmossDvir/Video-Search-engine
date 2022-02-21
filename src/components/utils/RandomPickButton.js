import React from "react";
import Button from "@mui/material/Button";
import "./RandomPickButton.css";

const RandomPickButton = ({ onClick, text }) => {
  return (
    <Button className="random-button" variant="contained" onClick={onClick}>
      {text ?? ""}
    </Button>
  );
};

export default RandomPickButton;
