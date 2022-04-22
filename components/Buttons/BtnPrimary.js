import LoadingButton from "@mui/lab/LoadingButton";
import Link from "next/link";
import { useRouter } from "next/router";

const BtnPrimary = ({ text, loading, handleClick, link = "", color = "#110066", disabled = false }) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <Link href={link ? link : router.asPath}>
        <LoadingButton
          disableElevation
          sx={{
            "&.MuiLoadingButton-root.MuiLoadingButton-loading": { color: "#F0F2F4" },
            bgcolor: `${disabled ? "#818FA3" : color} !important`,
            whiteSpace: "nowrap",
            borderRadius: "8px",
            textTransform: "none",
            minWidth: "100%",
            fontFamily: "'SF Pro Display', sans-serif !important",
            width: "100%",
            height: "48px",
            color: "white !important",
          }}
          onClick={handleClick}
          disabled={disabled}
          loading={loading}
          loadingPosition="start"
          startIcon=""
          variant="contained"
        >
          <span className="body_heavy">{text}</span>
        </LoadingButton>
      </Link>
    </div>
  );
};

export default BtnPrimary;
