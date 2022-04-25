import React, { useState } from "react";
import AES from "crypto-js/aes";
import { enc } from "crypto-js";
import ModalContainer from "../ModalContainer";
import TabCard from "./Tab-Card";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getUser } from "../../store/user";
import { baseInstance } from "../../axios";

const ShoutParties = ({ shoutParties }) => {
  const [chargeRequest, setchargeRequest] = useState(false);
  const [insufficientPopup, setInsufficientPopup] = useState(false);
  const [checkingBal, setCheckingBal] = useState(false);
  const router = useRouter();
  const user = useSelector(getUser);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [checkingCanJoin, setCheckingCanJoin] = useState(false);
  const [activeParty, setActiveParty] = useState(null);

  const encryptId = (str) => {
    const ciphertext = AES.encrypt(str, "mOhL95dmdjdpdYpgYTf8qLmssV5Px7sUpj");
    // return encodeURIComponent(ciphertext.toString());
    return ciphertext.toString();
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

  // const onEnterShoutParty = (id, i) => {
  //   return async () => {
  //     await canJoinParty(id);
  //   };
  // };

  const onCanCharge = async () => {
    setCheckingBal(true);
    try {
      const balance = await checkBalance(encryptId(JSON.stringify({ user: user?.user.id })));
      setCheckingBal(false);
      if (200 > balance) {
        console.log("Insufficient balance");
        setchargeRequest(false);
        setInsufficientPopup(true);
      } else {
        console.log("Good to go balance");
        setchargeRequest(false);
        setSentSuccess(true);
        console.log("user token is ", user.token);
      }
    } catch (error) {
      console.log("there was an error ", error.response);
    }
  };

  const canJoinParty = async (partyId) => {
    setCheckingCanJoin(true);
    console.log("party is is", partyId);
    try {
      const resp = await baseInstance.post(
        "/party/join",
        {
          party: partyId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: user.token,
          },
        }
      );
      console.log("Response is ", resp.data);
      setCheckingCanJoin(false);
      router.push("/livestream");
    } catch (error) {
      setCheckingCanJoin(false);
      if (error.response && error.response.status == 400 && error.response.data.message.includes("paid")) {
        console.log(error.response.data.message);
        setchargeRequest(true);
      } else {
        console.log("There was an error joining party");
      }
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
    router.push(`/livestream/${shoutParties[activeParty].id}`);
  };
  return (
    <>
      {/* Charge Modal */}
      <ModalContainer onClose={toggleChargeRequestModal} onAction={onCanCharge} toggle={toggleChargeRequestModal} open={chargeRequest} processing={checkingBal} actionText="Okay">
        <div className="grid place-items-center">
          <Image height={72} width={72} alt="charge" src={"/images/coin-5.svg"}></Image>
          <p className="max-w-[22.1rem] mt-[2.4rem]  subheader_heavy text-center !text-gray-darker">
            You will be charged <br></br>
            2000 coins to join this party
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
            to join party
          </p>
        </div>
      </ModalContainer>

      {/* Paid success Modal */}
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
          <p className="max-w-[22.1rem] mt-[2.4rem]  subheader_heavy text-center !text-gray-darker">Purchase successful!</p>
        </div>
      </ModalContainer>
      <div>
        <h2 className="subheader_heavy mb-[.8rem]">Featured Parties</h2>
        {shoutParties.map((party, i) => {
          return (
            <div className={`mb-[2.2rem] ${party.name == "Easter Party" ? " hidden" : ""}`} key={i}>
              <TabCard
                date={new Date(party.date)}
                processing={activeParty == i ? checkingCanJoin : false}
                onEnterParty={() => {
                  console.log("setting active index");
                  setActiveParty(i);
                  canJoinParty(party.id);
                }}
                color={"#3CC13B"}
                text={party.name}
                link=""
              ></TabCard>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ShoutParties;
