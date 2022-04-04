import React from "react";
import Button from "@mui/material/Button";
import "./ShuffleButton.css";

const ShuffleButton = ({ onClick, text }) => {
    return (
    <Button className="random-button" variant="contained" onClick={onClick}>
      {text ?? ""}
    </Button>
    )
};

export default ShuffleButton;