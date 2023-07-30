import React from "react";
import "./InputLabel.css";

export const InputLabel = ({
  type,
  placeholder,
  name,
  classDesign,
  Length,
  functionHandler,
  onBlurFunction,
}) => {
  return (
    <>
      <input
        className={"InputLabel " + classDesign}
        type={type}
        placeholder={placeholder}
        name={name}
        maxLength={Length}
        onChange={(e) => functionHandler(e)}
        onBlur={(e) => onBlurFunction(e)}
      />
    </>
  );
};