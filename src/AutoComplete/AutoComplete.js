import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import "./AutoComplete.scss";
const Auto = styled(Autocomplete)`
  margin-top: 11px;
  margin-left:10px ;
`;
const TextValue = styled(TextField)`
`;
function AutoComplete(props) {
  const { options, getValue, getInputValue, label } = props;
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e, newValue) => {
    setValue(newValue);
    getValue(newValue);
  };

  const handleInputChange = (e, newInputValue) => {
    setInputValue(newInputValue);
    getInputValue(newInputValue);
  };

  return (
    <Auto
      className="from-text"
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      freeSolo
      disableClearable
      id="controllable-states-demo"
      options={options}
      sx={{ width: 250, marginTop: "20" }}
      renderInput={(params) => (
        <TextValue
          className="text"
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
          variant="standard"
        />
      )}
    />
  );
}

export default AutoComplete;
