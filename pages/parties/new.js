import React, { useState, useEffect } from "react";
import AES from "crypto-js/aes";
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
import MyRadio from "../../components/Radio";
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { baseInstance } from "../../axios";

const New = () => {
  // States
  const user = useSelector(getUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const creatingParty = useSelector(getCreatingPartyStatus);
  const partyCreated = useSelector(getpartyCreated);
  const errorStatus = useSelector(getErrorStatus);
  const [party, setParty] = useState({
    owner: "Self",
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
  const [disabled, setDisabled] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Self");
  const [processingCharge, setProcessingCharge] = useState(false);

  const isPartyInfoValid = () => {
    console.log(party.name);
    if (!party.name || !party.date || !party.description || !party.owner) {
      return false;
    } else {
      return true;
    }
  };
  const onUploadFile = ({ name, path }) => {
    console.log("file path is", path);
    setParty((val) => ({ ...val, video: path }));
  };
  const onCreate = () => {
    console.log("on create party is ", party);
    // if (selectedValue == "Self") {
    //   setParty((val) => ({ ...val, owner: user?.user?.firstname }));
    // }
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

  const checkBalance = async (value) => {
    const body = { data: value };
    console.log("data is", body);
    try {
      const resp = await baseInstance.post("/billing/check-coin", JSON.stringify(body));
      console.log("coins left is in create new party is ", resp.data.data.coins);
      return resp.data.data.coins;
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log("Error response is: ", error);
      }
    }
  };

  const encryptId = (str) => {
    const ciphertext = AES.encrypt(str, "mOhL95dmdjdpdYpgYTf8qLmssV5Px7sUpj");
    // return encodeURIComponent(ciphertext.toString());
    return ciphertext.toString();
  };

  const onCanCharge = async () => {
    setProcessingCharge(true);
    const balance = await checkBalance(encryptId(JSON.stringify({ user: user?.user.id })));

    if (balance > 2000) {
      dispatch(createParty(party, user.user.token));
    } else {
      setchargeRequest(false);
      setInsufficientPopup(true);
    }
  };

  useEffect(() => {
    router.prefetch(`/parties/id`);
    return () => {
      console.log("Destroying create party and dipatching setPartyCreated to fals");
      dispatch(setPartyCreated(false));
    };
  }, []);

  useEffect(() => {
    if (partyCreated && !creatingParty && !errorStatus) {
      setDisabled(true);
      console.log("After creating party.. in use effect");
      router.push(`/parties/${partyCreated.id}?message=party created successfully`);
      // Reset creat party state
      // dispatch(setPartyCreated(false));
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
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value == "Self") {
      setParty((val) => ({ ...val, owner: event.target.value }));
      setOwnerError(true);
    } else {
      setParty((val) => ({ ...val, owner: "" }));
      setOwnerError(false);
    }
    console.log("selected value is", event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "size-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <>
      <Protect>
        <Notification open={notifOpen} icon={<i className="icon-add-user"></i>} title={"Create Party Error"} message="Error creating party!!" color="#FA9330"></Notification>

        {/* Charge Modal */}
        <ModalContainer
          onClose={toggleChargeRequestModal}
          onAction={onCanCharge}
          toggle={toggleChargeRequestModal}
          open={chargeRequest}
          processing={creatingParty || partyCreated?.id ? true : false || processingCharge}
          actionText="Okay"
        >
          <div className="grid place-items-center">
            <Image height={72} width={72} alt="charge" src={"/images/coin-5.png"}></Image>
            <p className="max-w-[22.1rem] mt-[2.4rem]  subheader_heavy text-center !text-gray-darker">
              You will be charged <br></br>2000 coins to create this party{" "}
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
                setParty((val) => ({ ...val, name: e.target.value }));
                if (!e.target.value) {
                  setNameError(true);
                } else {
                  setNameError(false);
                }
              }}
              status={nameError ? "error" : ""}
              message={nameError ? "This field is required" : ""}
              label="Party name*"
              placeholder="David’s 25th Birthday Bash 🎊🍾"
            ></Text>
            {/* Owner */}
            <label className="caption_heavy text-black-default flex">Create for</label>
            {/* <div className="flex -translate-x-4">
              <div className="flex items-center">
                <Radio {...controlProps("Individual")} />
                <p className="caption_heavy text-black-default">My self</p>
              </div>
              <div className="flex items-center">
                <Radio {...controlProps("Others")} />
                <p className="caption_heavy text-black-default">Others</p>
              </div>
            </div> */}

            <FormControl>
              <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={selectedValue} onChange={handleChange}>
                <FormControlLabel value="Self" control={<Radio />} label="Self" />
                <FormControlLabel value="Others" control={<Radio />} label="Others" />
              </RadioGroup>
            </FormControl>
            {selectedValue == "Others" && (
              <Text
                onChange={(e) => {
                  setParty((val) => ({ ...val, owner: e.target.value }));
                  if (!e.target.value) {
                    // setParty((val) => ({ ...val, owner: "Self" }));
                    setOwnerError(true);
                  } else {
                    setOwnerError(false);
                  }
                  // if (!e.target.value) {
                  //   setOwnerError(true);
                  // } else {
                  //   setOwnerError(false);
                  // }
                }}
                status={ownerError ? "error" : ""}
                message={ownerError ? "This field is required" : ""}
                // label="Owner*"
                placeholder="Owner"
              ></Text>
            )}

            {/* <div className="">
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
            </div> */}
            <Calendar
              required={true}
              errorStatus={dateError}
              onChange={(newValue) => {
                setParty((val) => ({ ...val, date: newValue }));
                if (newValue?.toString().includes("Invalid")) {
                  setDateError(true);
                } else {
                  setDateError(false);
                }
              }}
              label={"Date*"}
            ></Calendar>
            <Upload onUploadFile={onUploadFile}></Upload>
            <TextArea
              onChange={(e) => {
                setParty((val) => ({ ...val, description: e.target.value }));
                if (!e.target.value) {
                  setDescError(true);
                } else {
                  setDescError(false);
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
