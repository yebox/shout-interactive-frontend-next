import { useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Label from "./Label";

const Calender = ({ label }) => {
  const [value, setValue] = useState(new Date());

  const inputStyle = {
    borderRadius: "20px",
    cursor: "pointer",
    background: "url(/icons/angle-down.svg) ",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "96%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      maxWidth: "375px",
      width: "100%",
      height: "48px",
      // background: "url(/icons/angle-down.svg) ",
    },
    "& .MuiOutlinedInput-input": {
      color: "#110066",
      fontSize: "14px",
      px: "39px",
    },
    "& .MuiOutlinedInput-root:hover": {
      outline: "none",
    },

    "& Fieldset": {
      border: "1px solid #DFE4E8",
    },
    "& .MuiInputAdornment-outlined": {
      position: "absolute",
      ml: "3px",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "2rem",
    },
    "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#110066", borderWidth: "1px" },
  };
  return (
    <div>
      <Label text={label}></Label>
      <LocalizationProvider sx={{ width: "500px" }} dateAdapter={AdapterDateFns}>
        <DatePicker
          sx={{
            "&.MuiFormControl-root .MuiTextField-root": {
              backgroundColor: "red",
            },
            "& .MuiCalendarPicker-root": {
              cursor: "pointer",
              width: "5000px",
              backgroundColor: "red",
              color: "red",
            },
          }}
          views={["day"]}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            console.log(newValue);
          }}
          renderInput={(params) => <TextField {...params} sx={{ ...inputStyle }} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default Calender;
