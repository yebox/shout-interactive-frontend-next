import React, { useState, useEffect, useRef } from "react";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import HeadersV1 from "../../components/Headers/Headers-v1";
import Container from "../../components/Layouts/Container";
import BaseLayout from "../../components/Layouts/Layout";
import Image from "next/image";
import Label from "../../components/FormElements/Label";
import Text from "../../components/FormElements/TextField";
import FixedBtn from "../../components/Buttons/FixedBtn";
import ProgressBar from "../../components/ProgressBar";
import BoxContainer from "../../components/BoxContainer";
import { Avatar } from "@mui/material";
import BtnPrimary from "../../components/Buttons/BtnPrimary";
import Drawer from "../../components/Drawer";
import MyAvatar from "../../components/Avatar";
import { useRouter } from "next/router";
import useGetParams from "../../hooks/useGetParams";
import {
  getIndividualParties,
  getIsInvitesLoadingStatus,
  getIsPartiesLoadingStatus,
  getPartiesLoadedStatus,
  getUpdatedPartiesDetailsId,
  getUpdatedStatus,
  loadIndividualParty as loadIndividualPartyUpdate,
} from "../../store/party";
import Protect from "../../components/Protect";
import { useDispatch, useSelector } from "react-redux";
import { createGiftGoalThunk, getCreatedStatus, getCreateErrorStatus, getCreatingGoalStatus, getGifts, setCreatedGoalStatus } from "../../store/gift-goal";
import { getUser } from "../../store/user";
import Notification from "../../components/Notification";
import GiftGoalSkeleton from "../../components/Skeleton/Gift-Goal";
import { baseInstance } from "../../axios";
import ModalContainer from "../../components/ModalContainer";
import FixedBottom from "../../components/Layouts/FixedBottom";
import EmptyState from "../../components/EmptyState";

const GiftGoal = () => {
  const { getParams, getUrl } = useGetParams();
  const router = useRouter();
  const partiesLoaded = useSelector(getPartiesLoadedStatus);
  const individualParties = useSelector(getIndividualParties);
  const gifts = useSelector(getGifts);
  const user = useSelector(getUser);
  const creatingGoalStatus = useSelector(getCreatingGoalStatus);
  const createdGoalStatus = useSelector(getCreatedStatus);
  const createGoalError = useSelector(getCreateErrorStatus);
  const [party, setParty] = useState(null);
  const isPartiesLoading = useSelector(getIsPartiesLoadingStatus);
  const isInvitesLoading = useSelector(getIsInvitesLoadingStatus);
  const [contributors, setContributors] = useState([
    { name: "David Adeleke", amount: "5000" },
    { name: "Ada Lovace", amount: "1000" },
  ]);
  const [goalData, setGoalData] = useState({
    gift: "",
    user: "",
    party: "",
  });
  // const [allGoals, setAllGoals] = useState([
  //   { name: "2 Week Trip to Dubai ", desc: "A 2 week all expense paid trip to dubai brought to you by Emirates Airline." },
  //   { name: "Mercedes G-Wagon 2021 ", desc: "Stand a chance to win a 2021 Mercedes G-Wagon. Courtesy of Mercedes Nigeria." },
  //   { name: "N10,000,000 Cash! ", desc: "Win 10 million naira in cash. Courtesy of Heritage Bank" },
  // ]);
  const allGoals = useSelector(getGifts);
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedGiftGoal, setSelectedGiftGoal] = useState(null);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [selectedIsEmpty, setSelectedIsEmpty] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [notifOpen, setNotifOpen] = useState("");
  const dispatch = useDispatch();
  const [coinAmount, setCoinAmount] = useState(null);
  const [chargeRequest, setchargeRequest] = useState(false);
  const [insufficientPopup, setInsufficientPopup] = useState(false);
  const [checkingBal, setCheckingBal] = useState(false);
  const [processingCharge, setProcessingCharge] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [coinValueError, setCoinValueError] = useState(false);
  const inputRef = useRef(null);
  const updatedPartiesId = useSelector(getUpdatedPartiesDetailsId);
  const partiesUpdated = useSelector(getUpdatedStatus);

  const toggleDrawer = (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    // if (creatingGoalStatus) {
    //   return;
    // }
    // setBtnDisabled(true);
    setIsDrawerOpened((val) => !val);
    setActiveIndex(null);
    if (!createdGoalStatus) {
      setSelectedGiftGoal(null);
    }
  };

  const onSelectGiftGoal = (i) => {
    setSelectedGiftGoal(allGoals[i]);
  };

  const onCreateGoal = () => {
    // setGoalData((val) => ({ ...val, party: party.id, user: user.user.id, gift: selectedGiftGoal?.id }));
    dispatch(createGiftGoalThunk({ party: party?.id, user: user?.user?.id, gift: selectedGiftGoal?.id }, user?.user?.id));
    console.log("goal object", { party: party?.id, user: user?.user?.id, gift: selectedGiftGoal?.id });
  };

  const encryptId = (str) => {
    const ciphertext = AES.encrypt(str, "mOhL95dmdjdpdYpgYTf8qLmssV5Px7sUpj");
    // return encodeURIComponent(ciphertext.toString());
    return ciphertext.toString();
  };

  const sendGiftCoins = async (coins, partyId) => {
    setCoinAmount(coins);
    setchargeRequest(true);
  };

  const onCanCharge = async () => {
    setCheckingBal(true);
    try {
      const balance = await checkBalance(encryptId(JSON.stringify({ user: user?.user.id })));
      setCheckingBal(false);
      if (coinAmount > balance) {
        console.log("Insufficient balance");
        setCoinValueError("You need more coins to send this amount");

        setchargeRequest(false);
        setInsufficientPopup(true);
      } else {
        inputRef.current.value = "";
        console.log("Good to go balance");
        setchargeRequest(false);
        console.log("user token is ", user.token);
        const response = await baseInstance.post(
          "/party/contribute",
          {
            party: party.id,
            amount: parseInt(coinAmount),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: user.token,
            },
          }
        );

        console.log("Response from charge", response.data);

        const newUpdatedIndividualParties = individualParties.map((el) => {
          if (el.id == party.id) {
            return {
              ...party,
              GiftGoal: {
                ...party?.GiftGoal,
                contributed: party?.GiftGoal?.contributed ? parseInt(party?.GiftGoal?.contributed) + parseInt(coinAmount) : parseInt(coinAmount),
                // contributors: party?.GiftGoal?.contributors ? [...party?.GiftGoal?.contributors, user.user.id] : [user.user.id],
                contributors: party?.GiftGoal?.contributors
                  ? [...party?.GiftGoal?.contributors, { id: user.user.id, firstname: user.user.firstname, lastname: user.user.lastname, amount: parseInt(coinAmount) }]
                  : [{ id: user.user.id, firstname: user.user.firstname, lastname: user.user.lastname, amount: parseInt(coinAmount) }],
              },
            };
          } else {
            return el;
          }
        });
        setSentSuccess(true);
        console.log("updated individual parties are ", newUpdatedIndividualParties);
        dispatch(loadIndividualPartyUpdate(newUpdatedIndividualParties));
        inputRef.current.value = "";
      }
    } catch (error) {
      console.log("there was an error making contribution", error.response);
    }
  };

  const toggleChargeRequestModal = () => {
    chargeRequest ? setchargeRequest(false) : setchargeRequest(true);
  };
  const toggleInsufficientPopup = () => {
    insufficientPopup ? setInsufficientPopup(false) : setInsufficientPopup(true);
  };
  const toggleSentSuccess = () => {
    sentSuccess ? setSentSuccess(false) : setSentSuccess(true);
  };

  const checkBalance = async (value) => {
    const body = { data: value };
    console.log("data is", body);
    try {
      const resp = await baseInstance.post("/billing/check-coin", JSON.stringify(body));
      // console.log("coins left is ", resp.data.data.coins);
      return resp.data.data.coins;
    } catch (error) {
      console.log(error.response);
    }
  };

  const onGetCoins = () => {
    router.push("/wallet");
  };

  function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
  }

  useEffect(() => {
    const test3 = { idt: 2, GiftGoal: { contributors: [] } };
    console.log("spread operator...");
    const newArr = test3?.GiftGoal?.contributors ? [...test3?.GiftGoal?.contributors, 1] : [1];
    console.log(newArr);
  }, []);

  // useEffect(() => {
  //   const getPartyDetail = (parties, id) => {
  //     const partyArr = parties.filter((el) => {
  //       return el.id == id;
  //     });
  //     console.log(parties);
  //     console.log("party detail is", partyArr);
  //     return partyArr[0];
  //   };

  //   if (router.query.id && updatedPartiesId.includes(router.query.id)) {
  //     const party = getPartyDetail(individualParties, router.query.id);

  //     setParty(party);
  //     console.log("parties in gift goal", party);
  //   } else if (router.query.id && !updatedPartiesId.includes(router.query.id)) {
  //     router.replace(`/parties/${router.query.id}`);
  //   }
  // }, [router.query, partiesLoaded, individualParties, updatedPartiesId]);

  useEffect(() => {
    const getPartyDetail = (parties, id) => {
      const partyArr = parties.filter((el) => {
        return el.id == id;
      });
      console.log(parties);
      console.log("party detail is", partyArr);
      return partyArr[0];
    };

    if (router.query.id) {
      const party = getPartyDetail(individualParties, router.query.id);
      setParty(party);
      console.log("parties in gift goal", party);
    }
  }, [router.query, partiesLoaded, individualParties]);

  useEffect(() => {
    console.log("in party gift user effect", party, gifts);
    const getGiftGoal = (gifts, giftId) => {
      const giftArr = gifts.filter((gift) => {
        return gift.id == giftId;
      });
      console.log("GIft goal is", giftArr);
      return giftArr[0];
    };
    if (gifts && party && party.GiftGoal) {
      const goal = getGiftGoal(gifts, party.GiftGoal.GiftId);
      // const hybridGoal = { ...goal, contributors: party.GiftGoal.contributors, contributed: party.GiftGoal.contributed };
      console.log("selected gift goal is ", goal);
      console.log("various ids", party.GiftGoal.GiftId, gifts);
      setSelectedGiftGoal(goal);
    } else {
    }
  }, [party, gifts]);

  // Create UseEffect
  useEffect(() => {
    if (createGoalError && !creatingGoalStatus && !createdGoalStatus) {
      setSelectedGiftGoal(null);
      toggleDrawer();
      setNotifOpen("Error Creating Goal");
      setTimeout(() => {
        setNotifOpen("");
      }, 6000);
      console.log("error craeting goal...");
    }
    if (!createGoalError && !creatingGoalStatus && createdGoalStatus) {
      setIsDrawerOpened(false);
      setNotifOpen("Gift Goal Successfully Created!");
      setTimeout(() => {
        setNotifOpen("");
      }, 6000);
      // setSelectedGiftGoal(activeIndex);
      onSelectGiftGoal(activeIndex);
      // Reset the goal state for later creation
      dispatch(setCreatedGoalStatus(false));
    }
  }, [creatingGoalStatus, createdGoalStatus, createGoalError]);

  return (
    <>
      <Notification open={notifOpen} icon={<i className="icon-info-circle"></i>} title={"Gift goal"} message={notifOpen} color={notifOpen?.includes("Error") ? "red" : "green"}></Notification>

      {/* Charge Modal */}
      <ModalContainer onClose={toggleChargeRequestModal} onAction={onCanCharge} toggle={toggleChargeRequestModal} open={chargeRequest} processing={checkingBal} actionText="Okay">
        <div className="grid place-items-center">
          <Image height={72} width={72} alt="charge" src={"/images/coin-5.svg"}></Image>
          <p className="max-w-[22.1rem] mt-[2.4rem]  subheader_heavy text-center !text-gray-darker">
            You will be charged <br></br>
            {coinAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} coins{" "}
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
            to contribute
          </p>
        </div>
      </ModalContainer>

      {/* Sent coins success Modal */}
      <ModalContainer
        onAction={() => {
          toggleSentSuccess();
        }}
        toggle={toggleSentSuccess}
        open={sentSuccess}
        actionText="Okay"
      >
        <div className="grid place-items-center">
          <Image height={72} width={72} alt="charge" src={"/images/success.png"}></Image>
          {/* <i className="icon-exclamation-triangle text-[7.2rem] text-warn-default"></i> */}
          <p className="max-w-[22.1rem] mt-[2.4rem]  subheader_heavy text-center !text-gray-darker">Successfully contributed!</p>
        </div>
      </ModalContainer>
      <Protect>
        <BaseLayout>
          <HeadersV1 link={`/parties/${router?.query?.id}?type=${router.query.type}`} text={"Gift goal"}>
            <div></div>
          </HeadersV1>

          {/* All Goals Drawer */}
          <Drawer
            open={isDrawerOpened}
            onClose={(e) => {
              toggleDrawer(e);
            }}
          >
            <h2 className="title_heavy mt-[2.4rem] text-black-default">Gifts</h2>
            <p className="caption_light mb-[1.6rem] text-black-default">Select a gift you would like to win</p>

            {/* All goals */}
            <div className="pb-[8.2rem] ">
              {allGoals?.map((e, i) => {
                return (
                  <button
                    onClick={() => {
                      setActiveIndex(i);
                      setBtnDisabled(false);
                      onSelectGiftGoal(i);
                    }}
                    className={` ${
                      activeIndex == i ? "border-primary" : ""
                    } flex items-center mb-[1.8rem] last:mb-0  w-full rounded-[.8rem] border-transparent border border-gray-light hover:border-primary p-[.8rem] focus:outline-primary focus:outline-1 focus:outline`}
                    key={i}
                  >
                    <div className=" mr-[.8rem]">
                      <MyAvatar height="56px" width="56px" alt={e.title} src={e.image} />
                    </div>
                    <div className="flex flex-col self-start mr-auto">
                      <span className="body_heavy mb-[.2rem] text-black-default text-left">{e.title}</span>
                      <span className="caption_light text-left text-black-light">{e.description}</span>
                    </div>
                  </button>
                );
              })}
              {allGoals?.length == 0 && <p className=" text-gray-600">No gift goal yet!</p>}
            </div>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full p-[1.6rem]">
              <BtnPrimary
                link={`/gift-goal/${router?.query?.id}?type=${router.query.type}`}
                loading={creatingGoalStatus}
                disabled={creatingGoalStatus || btnDisabled}
                handleClick={() => {
                  onCreateGoal();
                }}
                color="#14B363"
                // disabled={btnDisabled}
                text={"Submit"}
              ></BtnPrimary>
            </div>
          </Drawer>

          {/* Empty State */}
          {!party?.GiftGoal && !selectedGiftGoal && !isPartiesLoading && router.query.type == "individual" && (
            <div className="grid place-content-center place-items-center mt-[9.2rem] relative">
              <Image width={88} height={88} alt="musical-notes" src={"/images/gift-box.png"}></Image>
              <h2 className="headline_heavy text-black-default mb-[.8rem] mt-[3.2rem]">No gift goal</h2>
              <p className="body_light mb-[4.8rem]">You have not selected a gift goal</p>
              <BtnPrimary
                link={`/gift-goal/${router?.query?.id}?type=${router.query.type}`}
                handleClick={() => {
                  setIsDrawerOpened(true);
                }}
                text="Select Gift goal"
              ></BtnPrimary>
            </div>
          )}
          {!party?.GiftGoal && !selectedGiftGoal && !isPartiesLoading && router.query.type == "invite" && <EmptyState></EmptyState>}

          {/* Image-Picture */}
          {selectedGiftGoal && (
            <>
              <section className="mt-[1.6rem] mb-[10rem]">
                <Container>
                  <div className="border rounded-[1.3rem] p-[1.6rem] mb-7 ">
                    <Image className=" object-cover object-top rounded-[1.3rem]" width={700} height={416.2} src={selectedGiftGoal?.image} alt="place-img"></Image>
                    <h3 className="title_heavy text-black-default mt-[1.6rem]">{selectedGiftGoal?.title}</h3>
                    <p className="mb-[1.6rem] caption_light ">{selectedGiftGoal?.description}</p>
                    <ProgressBar color="#3CC13B" value={(party?.GiftGoal?.contributed * 100) / selectedGiftGoal?.price || 0}></ProgressBar>
                    <div className="mt-[.4rem]">
                      <span className="caption_heavy text-black-default">
                        {party?.GiftGoal?.contributed || 0}/ {selectedGiftGoal?.price} Coins
                      </span>
                    </div>
                  </div>
                  {/* Contributors */}
                  <BoxContainer>
                    <h3 className="subheader_heavy mb-[1.6rem]">Contributors</h3>
                    {partiesUpdated &&
                      party?.GiftGoal?.contributors?.map((e, i) => {
                        return (
                          <div key={i} className="flex items-center mb-[1.6rem]">
                            {/* <img className="h-[3.4rem] w-[3.4rem]" src="/"></img> */}
                            <Avatar sx={{ borderRadius: "10px" }} alt={e.name} src="/broken-image.jpg" />
                            <p className="ml-[1rem] caption_heavy text-[#90979E] max-w-[22.8rem]">
                              <span className="text-[#C0C9D2] mr-3">{e.firstname + " " + e.lastname}</span>
                              <span>Sent you {e?.amount} coins 🎉🎉</span>
                            </p>
                          </div>
                        );
                      })}
                    {!party?.GiftGoal?.contributors && <p>No contributors yet</p>}
                  </BoxContainer>

                  <form className="mb-[3rem] mt-[1.6rem]">
                    <Text
                      reference={inputRef}
                      onChange={(e) => {
                        console.log("evetn is ", e.target.value);
                        if (!e.target.value) {
                          setCoinValueError("Enter an amount");
                        } else {
                          setCoinValueError(false);
                          var val = parseInt(e.target.value.replace(",", ""));
                          setCoinAmount(val);
                          // setCoinAmount(e.target.value);
                        }
                      }}
                      status={coinValueError ? "error" : ""}
                      message={coinValueError}
                      placeholder="Amount"
                      label="Send coins"
                    ></Text>
                  </form>
                </Container>
              </section>
              {/* <FixedBtn
                action={async (e) => {
                  if (!onlyNumbers(coinAmount)) {
                    return setCoinValueError("Please enter a valid amount");
                  }
                  console.log("user id is", user.user.id);
                  console.log("selected gift goal", selectedGiftGoal);
                  console.log("encrypted data is", encryptId(JSON.stringify({ user: user.user.id })));
                  sendGiftCoins(coinAmount);
                }}
                text={"Send coins"}
                link={`/gift-goal/${router.query.id}`}
              ></FixedBtn> */}
              <FixedBottom>
                <BtnPrimary
                  handleClick={async (e) => {
                    if (!onlyNumbers(coinAmount)) {
                      return setCoinValueError("Please enter a valid amount");
                    }
                    console.log("user id is", user.user.id);
                    console.log("selected gift goal", selectedGiftGoal);
                    console.log("encrypted data is", encryptId(JSON.stringify({ user: user.user.id })));
                    sendGiftCoins(coinAmount);
                  }}
                  text={"Send coins"}
                  link={`/gift-goal/${router.query.id}`}
                ></BtnPrimary>
              </FixedBottom>
            </>
          )}

          {isPartiesLoading && !selectedGiftGoal && <GiftGoalSkeleton />}
        </BaseLayout>
      </Protect>
    </>
  );
};

export default GiftGoal;
