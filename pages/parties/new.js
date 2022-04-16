import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import BtnPrimary from "../../components/Buttons/BtnPrimary";
import Calendar from "../../components/FormElements/Calendar";
import TextArea from "../../components/FormElements/TextArea";
import Text from "../../components/FormElements/TextField";
import HeadersV1 from "../../components/Headers/Headers-v1";
import Container from "../../components/Layouts/Container";
import FixedBottom from "../../components/Layouts/FixedBottom";
import BaseLayout from "../../components/Layouts/Layout";
import Upload from "../../components/Upload/Upload";
import Chip from "@mui/material/Chip";
import MyAvatar from "../../components/Avatar";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../store/user";
import ModalContainer from "../../components/ModalContainer";
import { createParty, getCreatingPartyStatus, getErrorStatus, getpartyCreated, setPartyCreated } from "../../store/party";
import Notification from "../../components/Notification";
import Protect from "../../components/Protect";

const New = () => {
  // States
  const user = useSelector(getUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const creatingParty = useSelector(getCreatingPartyStatus);
  const partyCreated = useSelector(getpartyCreated);
  const errorStatus = useSelector(getErrorStatus);
  const [party, setParty] = useState({
    owner: "",
    name: "",
    geusts: ["geust@gmail.com", "geust2@gmail.com"],
    date: "",
    description: "",
    video: null,
    user: "",
  });
  const [nameError, setNameError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [ownerError, setOwnerError] = useState(false);
  const [chargeRequest, setchargeRequest] = useState(false);
  const [insufficientPopup, setInsufficientPopup] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  // const [processingCharge, setProcessingCharge] = useState(false);

  const isPartyInfoValid = () => {
    console.log(party.name);
    if (!party.name || !party.date || !party.description) {
      return false;
    } else {
      return true;
    }
  };

  const onCreate = () => {
    console.log("on create");
    if (!isPartyInfoValid()) {
      console.log(" party not valide");
      if (!party.name) setNameError(true);
      if (!party.owner) setOwnerError(true);
      if (!party.date) setDateError(true);
      if (!party.description) setDescError(true);
      return;
    }
    setParty((val) => ({ ...val, user: user.user.id }));
    setchargeRequest(true);
  };

  const onCanCharge = () => {
    if (user.coins > 2000) {
      dispatch(createParty(party));
      // setProcessingCharge(true);
    } else {
      setchargeRequest(false);
      setInsufficientPopup(true);
    }
  };

  useEffect(() => {
    if (partyCreated && !creatingParty && !errorStatus) {
      console.log("After creating party.. in use effect");
      router.push("/parties?message=party created successfully");
      // Reset creat party state
      dispatch(setPartyCreated(false));
    }
    if (!partyCreated && !creatingParty && errorStatus) {
      setchargeRequest(false);
      setNotifOpen(true);
      setTimeout(() => {
        setNotifOpen(false);
      }, 3000);
      dispatch(setPartyCreated(false));
    }
  }, [partyCreated, creatingParty, errorStatus]);

  const onGetCoins = () => {
    router.push("/wallet");
  };

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    console.info("You clicked the delete icon.");
  };

  const toggleChargeRequestModal = () => {
    chargeRequest ? setchargeRequest(false) : setchargeRequest(true);
  };
  const toggleInsufficientPopup = () => {
    insufficientPopup ? setInsufficientPopup(false) : setInsufficientPopup(true);
  };

  return (
    <>
      <Protect>
        <Notification open={notifOpen} icon={<i className="icon-add-user"></i>} title={"Create Party Error"} message="Error creating party!!" color="#FA9330"></Notification>

        {/* Charge Modal */}
        <ModalContainer onClose={toggleChargeRequestModal} onAction={onCanCharge} toggle={toggleChargeRequestModal} open={chargeRequest} processing={creatingParty} actionText="Okay">
          <div className="grid place-items-center">
            <Image height={72} width={72} alt="charge" src={"/images/coin-5.svg"}></Image>
            <p className="max-w-[22.1rem] mt-[2.4rem]  subheader_heavy text-center !text-gray-darker">
              You will be charged <br></br>2000 coins to join this party{" "}
            </p>
          </div>
        </ModalContainer>

        {/* INsufficient coins Modal */}
        <ModalContainer onAction={onGetCoins} toggle={toggleInsufficientPopup} open={insufficientPopup} actionText="Get Coins">
          <div className="grid place-items-center">
            {/* <Image height={72} width={72} alt="charge" src={"/images/coin-5.svg"}></Image> */}
            <i className="icon-exclamation-triangle text-[7.2rem] text-warn-default"></i>
            <p className="max-w-[22.1rem] mt-[2.4rem]  subheader_heavy text-center !text-gray-darker">
              You need more Coins <br></br>
              to create this party
            </p>
          </div>
        </ModalContainer>
        <BaseLayout>
          <HeadersV1 link={"/parties"} text={"New shout! party"}>
            <div></div>
          </HeadersV1>

          <Container>
            {/* Party Name */}
            <Text
              onChange={(e) => {
                if (!e.target.value) {
                  setNameError(true);
                } else {
                  setParty((val) => ({ ...val, name: e.target.value }));
                  setNameError(false);
                }
              }}
              status={nameError ? "error" : ""}
              message={nameError ? "This field is required" : ""}
              label="Party name*"
              placeholder="David’s 25th Birthday Bash 🎊🍾"
            ></Text>
            {/* Owner */}
            <Text
              onChange={(e) => {
                if (!e.target.value) {
                  setOwnerError(true);
                } else {
                  setOwnerError(false);
                  setParty((val) => ({ ...val, owner: e.target.value }));
                }
              }}
              status={ownerError ? "error" : ""}
              message={ownerError ? "This field is required" : ""}
              label="Owner*"
              placeholder="Owner"
            ></Text>
            <div className="">
              <label className="caption_heavy text-black-default flex mb-[8px] mt-[1.6rem]">Guests</label>
              <div
                className={`flex items-center relative h-[48px] mb-[10px] max-w-full min-w-[200px] w-full text-black-default body_light focus:border-primary focus:outline-0 border rounded-[16px] px-[8px] py-[14px]`}
              >
                <Chip
                  sx={{ paddingLeft: "8px" }}
                  avatar={<MyAvatar height="24px" width="24px"></MyAvatar>}
                  label="Clickable Deletable"
                  variant="outlined"
                  onClick={handleClick}
                  onDelete={handleDelete}
                />
                <i className="icon-add-user absolute right-3 text-gray-dark font-[2.2rem] top-1/2 -translate-y-1/2 cursor-pointer"></i>
              </div>
            </div>
            <Calendar
              required={true}
              errorStatus={dateError}
              onChange={(newValue) => {
                if (newValue?.toString().includes("Invalid")) {
                  setDateError(true);
                } else {
                  setDateError(false);
                  setParty((val) => ({ ...val, date: newValue }));
                }
              }}
              label={"Date*"}
            ></Calendar>
            <Upload></Upload>
            <TextArea
              onChange={(e) => {
                if (!e.target.value) {
                  setDescError(true);
                } else {
                  setDescError(false);
                  setParty((val) => ({ ...val, description: e.target.value }));
                }
              }}
              status={descError ? "error" : ""}
              message={descError ? "This field is required" : ""}
              label="Description"
              placeholder="Come and have a blast and party with me as I turn 25! 🍾"
            ></TextArea>
            <div className="pb-[14.8rem]"></div>
          </Container>
          <FixedBottom>
            <BtnPrimary
              handleClick={() => {
                console.log("btn clik");
                onCreate();
              }}
              text={"Create"}
              link="/parties/new"
            ></BtnPrimary>
          </FixedBottom>
        </BaseLayout>
      </Protect>
    </>
  );
};

// New.clientOnly = true;

export default New;
