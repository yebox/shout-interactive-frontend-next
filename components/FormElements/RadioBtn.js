import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const RadioBtn = ({ action, childrenRadio = [""] }) => {
  return (
    <div className="flex ">
      {/* Read material radio group for the onChange prop: (event, value)=>{} */}
      <RadioGroup row aria-label="gender" onChange={action} name="row-radio-buttons-group">
        {childrenRadio.map((el, i) => {
          return (
            <div key={i} className="mr-[24px]">
              <FormControlLabel
                sx={{
                  ml: 0,
                  "& .MuiFormControlLabel-label": {
                    fontSize: 12,
                    fontFamily: "SF Pro Display', sans-serif",
                  },
                }}
                value={el}
                control={
                  <Radio
                    name="same"
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 24,
                      },
                      color: "#90979E",
                      "&.Mui-checked": {
                        color: "#110066",
                      },
                    }}
                  />
                }
                label={el}
                labelPlacement="start"
              />
            </div>
          );
        })}
      </RadioGroup>
      {/* <div>
        <span classsName="caption_heavy">Campaing</span>
        <Radio
          name="same"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 28,
            },
            color: "#110066",
            "&.Mui-checked": {
              color: "#110066",
            },
          }}
        />
      </div>
      <div>
        <span classsName="caption_heavy">Campaing</span>
        <Radio
          name="same"
          sx={{
            "& .MuiSvgIcon-root": {
              fontSize: 28,
            },
            color: "#110066",
            "&.Mui-checked": {
              color: "#110066",
            },
          }}
        />
      </div> */}
    </div>
  );
};

export default RadioBtn;
