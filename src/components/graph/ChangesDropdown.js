import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { changeGraph } from "../../redux/graphSlice";

export default function ChangesDropdown() {
  const graphType = useSelector((store) => store.changeGraph);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(changeGraph(event.target.value));
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small"></InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={graphType}
        onChange={handleChange}
      >
        <MenuItem value={"Commits"}>Commits</MenuItem>
        <MenuItem value={"Additions"}>Additions</MenuItem>
        <MenuItem value={"Deletions"}>Deletions</MenuItem>
      </Select>
    </FormControl>
  );
}
