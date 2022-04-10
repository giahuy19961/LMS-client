import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDebounce } from "use-debounce";

const SearchText = ({
  searchText,
  setSearchText,
  placeholder = "Tìm kiếm...",
}) => {
  const [text, setText] = useState("");
  const [value] = useDebounce(text, 1000);

  useEffect(() => {
    setSearchText(value);
  }, [value]);

  return (
    <Paper
      component='form'
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 32,
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
      />
    </Paper>
  );
};

export default SearchText;
