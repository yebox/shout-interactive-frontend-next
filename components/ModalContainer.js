import BtnPrimary from "./Buttons/BtnPrimary";
import BtnOutlined from "./Buttons/BtnOutlined";
import Dialog from "@mui/material/Dialog";

const ModalContainer = ({ children, icon, headerText, onClose, actionText, onAction, open = false, toggle = () => {}, processing = false }) => {
  return (
    <Dialog sx={{ "& .MuiDialog-paper": { borderRadius: "1.4rem", minWidth: "310px" } }} onClose={toggle} open={open}>
      <div className="px-[1.6rem] pt-[2.2rem] pb-[3.2rem] rounded-[8px] md:w-[423px]">
        {/* modal header */}
        <div className="flex items-center mb-[2.5rem]">
          {/* <span className="rou rounded-full w-[28px] h-[28px] bg-primary-lightest-2 flex justify-center items-center">{icon}</span> */}
          <p className="title_heavy text-black-default mr-3">{headerText}</p>
          <span onClick={toggle} className="icon-cancel text-black-default text-[11px]  ml-[auto] cursor-pointer"></span>
        </div>

        <div>{children}</div>

        {/* modal footer */}
        <div className="flex justify-between mt-[6.3rem] gap-5">
          {onClose && (
            <div className="flex-1" onClick={toggle}>
              <BtnOutlined text="Cancel"></BtnOutlined>
            </div>
          )}

          {onAction && (
            <div className="flex-1" onClick={onAction}>
              <BtnPrimary loading={processing} disabled={processing ? true : false} text={processing ? "Processing" : actionText}></BtnPrimary>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ModalContainer;
