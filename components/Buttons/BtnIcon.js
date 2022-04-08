import Button from "@mui/material/Button";
import Link from "next/link";

const BtnIcon = ({ text, icon, link, color }) => {
  return (
    <Link href={link}>
      <Button
        disableElevation
        sx={{
          minWidth: "148px",
          whiteSpace: "nowrap",
          fontFamily: "'SF Pro Display', sans-serif !important",
          height: "48px",
          bgcolor: `${color ? color : "#110066"} !important`,
          textTransform: "none",
          borderRadius: "8px",
        }}
        variant="contained"
        startIcon={icon}
      >
        <span className="body_heavy">{text}</span>
      </Button>
    </Link>
  );
};

export default BtnIcon;
