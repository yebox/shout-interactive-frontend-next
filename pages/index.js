import Head from "next/head";
import Image from "next/image";
import Confetti from "react-dom-confetti";
import Carousel from "../components/Landing/Carousel";
import BaseLayout from "../components/Layouts/Layout";

import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import useDecodeJWT from "../hooks/useDecodeJWT";
import { baseInstance } from "../axios";
import { fetchUser, getAuthStatus, getUser, loadUser } from "../store/user";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import HomeSkeleton from "../components/Skeleton/Home";
import useLocalStorage from "../hooks/useLocalStorage";
import { determineUnit } from "../utils/determineUnit(K,H,M,T)";
import CarouselSlider from "../components/CarouselExt";
import { getAds, getAdsThunk } from "../store/ads";

export default function Home() {
  const config = {
    angle: 90,
    spread: 350,
    startVelocity: 40,
    elementCount: 200,
    dragFriction: 0.12,
    duration: 10000,
    stagger: 3,
    width: "15px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };
  const { verifyTokenServer } = useDecodeJWT();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const authenticated = useSelector(getAuthStatus);
  const router = useRouter();
  const { getLocalStorage } = useLocalStorage();
  const allAds = useSelector(getAds);

  const [splash, setSplash] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    console.log("value unit in useEffect", determineUnit(parseInt(user.coins)));
    // Delays the confeti animation
    setTimeout(() => {
      setSplash(!splash);
    }, 1500);
  }, []);

  // Useeffect to run after the router is loaded.
  // Gets the token from the url.NB, dependecy
  // useEffect(() => {
  //   // App User set-up on refresh
  //   // Verifies the token from the server and loads user. Utilizes the useDecodeJWT custom hook verifyTokenServer
  //   const verify = async (token) => {
  //     setLoading(true);
  //     const resp = await verifyTokenServer(`/auth/token/${token}`, baseInstance);
  //     console.log("response is", resp);
  //     // Dispatch an action to load the user
  //     if (resp) dispatch(loadUser(resp.data));
  //     setLoading(false);
  //   };
  //   // console.log("initial router", router.query.token);
  //   if (router.query.token) {
  //     console.log("router query-after loaded", router.query);

  //     // If a user does not exist in the global state call the verify function, which inturn dispatch an action to the gloabal user store to load the user
  //     // This is typically called on the page initial load or page refresh
  //     if (!user.user) {
  //       verify(router.query.token);
  //     }
  //   }
  // }, [router.query]);

  useEffect(() => {
    // const authToken = getLocalStorage("shout-token");
    console.log("router query is", router);
    if (authenticated) {
      return;
    }
    if (!authenticated && router.query.token) {
      dispatch(fetchUser(router.query.token));
    }
    // if (router.query.token) {
    //   dispatch(fetchUser(router.query.token));
    // } else {
    //   if (authenticated) {
    //   } else if (!authenticated && authToken) {
    //     dispatch(fetchUser(authToken));
    //   }
    // }
  }, [router.query.token]);
  useEffect(() => {
    console.log("user chage", user);
    // if (user.user) {
    //   setLoading(false);
    // }
    setLoading(false);
  }, [user]);

  function formatCoinAmt(value) {
    var suffixes = ["", "K", "M", "B", "T"];
    var suffixNum = Math.floor(("" + value).length / 3);
    var shortValue = parseFloat((suffixNum != 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2));
    if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
  }

  useEffect(() => {
    // if (!allAds[0]) {
    //   dispatch(getAdsThunk());
    // }
    dispatch(getAdsThunk());

    let intervalRef = setInterval(() => {
      dispatch(getAdsThunk());
    }, 14000);

    return () => {
      console.log("Destroying interval");
      clearInterval(intervalRef);
    };
  }, []);

  // useEffect(() => {
  //   const getAds = async () => {
  //     try {
  //       const resp = await baseInstance.post("/ads/get-ads/");
  //       console.log("resp ads is...", resp.data.data);
  //       setAds(resp.data.data);
  //     } catch (error) {
  //       if (error.response) {
  //         console.log("An error has occured", error.response);
  //       }
  //     }
  //   };

  //   getAds();
  // }, []);

  // useEffect(() => {
  //   console.log("All ads is in index is... ", allAds);
  // }, [allAds]);

  return (
    <BaseLayout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <HomeSkeleton></HomeSkeleton> */}
      {/* if loading data from server show loading skeleton state */}
      {loading && !user.user && <HomeSkeleton></HomeSkeleton>}
      {/* If not loading data and There is not user due to invalid token or and error */}
      {!loading && !user.user && <p>Invalid Token</p>}

      {!loading && user.user && (
        <main className="px-[1.6rem]">
          {/* #000 Header */}
          <header className="flex items-center my-[2rem]">
            <h2 className="headline_heavy text-primary whitespace-nowrap overflow-hidden text-ellipsis">Hi, {user.user ? user.user.lastname : "Guest"}</h2>
            <div className="flex items-center ml-auto">
              <Link href={"/wallet"}>
                <div className="p-[.952rem] flex items-center bg-gray-lighter rounded-2xl cursor-pointer">
                  {/* <Image src="/images/coin.png" height={24} width={24} alt="coins"></Image> */}
                  <img height={24} width={24} src="/images/coin.png" alt="coins"></img>
                  {/* <span className="subheader_heavy !text-gray-darker ml-[.5rem]">{formatCoinAmt(user.coins)}</span> */}
                  <span className="subheader_heavy !text-gray-darker ml-[.5rem]">{user?.coins?.toString().substring(0, 3) + " " + determineUnit(parseInt(user.coins))}</span>
                  {/* <span className="subheader_heavy !text-gray-darker ml-[.5rem]">100K</span> */}
                </div>
              </Link>
              <div className="p-[.952rem] flex items-center bg-gray-lighter rounded-2xl ml-[1.6rem]">
                <i className="icon-gift-box text-[2.4rem] text-[#FA4A0C]"></i>
                {/* <Image src="/images/gift-box.svg" height={24} width={24} alt="coins"></Image> */}
              </div>
              <div className="p-[.952rem] flex items-center bg-gray-lighter rounded-2xl ml-[1.6rem]">
                <Image src="/images/trophy-star.svg" height={24} width={24} alt="coins"></Image>
                {/* <i className="icon-trophy-star text-[2.4rem] text-[#FA9330]"></i> */}
              </div>
            </div>
          </header>

          {/* Carousel */}
          <div>
            {/* <Carousel></Carousel> */}
            <CarouselSlider data={allAds}></CarouselSlider>
          </div>
          <div className=" grid grid-cols-2 gap-6 mt-1">
            {/* Big Card */}
            <Link href={"/parties"}>
              <div
                className={`rounded-[1.3rem] relative bg-[url(/images/shout-party-bg.jpg)] bg-cover bg-[#FA4A0C] px-6 pb-[1.6rem] pt-[6.6rem] cursor-pointer hover:scale-[1.04] transition-all col-span-2 shadow overflow-hidden swell`}
              >
                <div style={{ marginLeft: "336px" }}>
                  <Confetti active={splash} config={config} />
                </div>
                <div className={`shoutimage flex ${splash ? "shake" : ""} `}>
                  {/* <Image height={214} width={370} src={"/images/shout-bottle.png"}></Image> */}
                  <img src={"/images/shout-bottle.png"}></img>
                  {/* <img src={"/images/Bottle.svg"}></img> */}
                </div>
                <h2 className="title_heavy !text-white ">Shout! Party</h2>
                <p className="caption_light !text-white relative">
                  Celebrate and party with your friends <br></br> everyday!
                </p>
                <button className="absolute top-1/2 -translate-y-1/2 right-[1.4rem] ">
                  {/* <img src="/images/chevron-right.svg"></img> */}
                  <i className="icon-chevron-right text-white text-[1.4rem]"></i>
                </button>
              </div>
            </Link>

            {/* Smaller Cards */}
            <Link href={"/shout-play"}>
              <div
                className={` rounded-[1.3rem] relative bg-[url(/images/shout-play-bg.jpg)]  bg-cover bg-[#14B363] px-6 pb-[1.6rem] pt-[5.6rem] cursor-pointer hover:scale-[1.04] transition-all shadow overflow-hidden swell`}
              >
                <div className=" absolute bottom-0 right-0  playimg flex">
                  <Image height={114} width={282} src={"/images/shout-games.png"}></Image>
                </div>
                <h2 className="body_heavy relative !text-white text-shadow text-shadow">Shout! Play</h2>
                <p className="small_light relative max-w-[11rem] !text-white text-shadow text-shadow">Play, earn and cashout everyday!</p>
                <button className="absolute top-1/2 -translate-y-1/2 right-[1.4rem] ">
                  {/* <img src="/images/chevron-right.svg"></img> */}
                  <i className="icon-chevron-right text-white text-[1.4rem] text-shadow"></i>
                </button>
              </div>
            </Link>
            <Link href={"/celeb-auction"}>
              <div
                className={` rounded-[1.3rem] relative bg-[url(/images/celeb-auction-bg.jpg)] bg-cover bg-[#110066] px-6 pb-[1.6rem] pt-[5.6rem] cursor-pointer hover:scale-[1.04] transition-all shadow overflow-hidden swell`}
              >
                <div className=" absolute bottom-0 right-0  auctionImg flex">
                  <Image height={114} width={260} src={"/images/shout-award.png"}></Image>
                </div>
                <h2 className="body_heavy relative !text-white text-shadow">Celeb Auction</h2>
                <p className="small_light relative !text-white max-w-[15rem] text-shadow">Own a piece of your fav&apos;s prized possessions.</p>
                <button className="absolute top-1/2 -translate-y-1/2 right-[1.4rem] ">
                  <i className="icon-chevron-right text-white text-[1.4rem] text-shadow"></i>
                </button>
              </div>
            </Link>
            <div
              style={{ backgroundImage: `url(${allAds[0].image})`, backgroundPosition: "right 0px center" }}
              className="w-full rounded-[1.3rem] shadow-sm  object-cover object-bottom h-[7.4rem] grid place-items-center col-span-2 bg-gray-300 text-black text-2xl "
            >
              AD.
            </div>
          </div>
        </main>
      )}
    </BaseLayout>
  );
}
