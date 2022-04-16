import { useEffect, useRef, useState } from "react";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from "@mui/material";
import { red } from "@mui/material/colors";
import Label from "./Label";

const Calendar = ({ label, onChange = () => {}, message = "Invalid date", errorStatus, required }) => {
  const [value, setValue] = useState(null);
  const [error, setError] = useState(errorStatus);
  const inputRef = useRef(null);

  useEffect(() => {
    errorStatus ? setError(true) : setError(false);
  }, [errorStatus]);

  const inputStyle = {
    borderRadius: "20px",
    cursor: "pointer",
    background: "url(/icons/angle-down.svg) ",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "96%",
    "& .MuiOutlinedInput-root": {
      borderRadius: "16px",
      // maxWidth: "375px",
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
      <div>
        <LocalizationProvider sx={{ width: "500px" }} dateAdapter={AdapterDateFns}>
          <DatePicker
            inputRef={inputRef}
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
              onChange(newValue);
            }}
            renderInput={(params) => <TextField {...params} sx={{ ...inputStyle }} />}
          />
        </LocalizationProvider>
        {error && (
          <div className="flex items-center mt-2">
            <span className="icon-exclamation-triangle text-[14px] text-error-default "></span> <span className="caption_light text-black-light ml-[8px]">{message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
