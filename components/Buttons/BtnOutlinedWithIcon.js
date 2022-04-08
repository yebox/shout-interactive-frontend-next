import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

const BtnOutlinedWithIcon = ({ text, icon, color }) => {
  return (
    <Tooltip
      title={text}
      sx={{
        width: "100px",
        "&.MuiTooltip-popper": {
          width: "200px",
        },
      }}
    >
      <button className={`px-[10px] h-[32px] whitespace-nowrap ${color ? "border-success-default" : "border-gray-dark"}   rounded-xl border  flex items-center justify-center`}>
        <span>{icon}</span>
        <span className="caption_heavy ml-[8px] text-gray-darker">{text}</span>
      </button>
    </Tooltip>
    // <Button
    //   disableElevation
    //   sx={{ Width: "113px", height: "32px", border: "1px solid #60646A", bgcolor: `transparent`, textTransform: "none", borderRadius: "8px" }}
    //   variant="outlined"
    //   startIcon={icon}
    // >
    //   <span className="caption_heavy">{text}</span>
    // </Button>
  );
};

export default BtnOutlinedWithIcon;
