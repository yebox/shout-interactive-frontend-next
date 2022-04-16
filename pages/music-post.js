import React, { useState, useEffect } from "react";
import Image from "next/image";
import BaseLayout from "../components/Layouts/Layout";
import { Checkbox } from "@mui/material";
import HeadersV1 from "../components/Headers/Headers-v1";
import Drawer from "../components/Drawer";
import MyAvatar from "../components/Avatar";
import BtnPrimary from "../components/Buttons/BtnPrimary";
import Container from "../components/Layouts/Container";
import Search from "../components/Search";
import useGetParams from "../hooks/useGetParams";

const MusicPost = () => {
  const { getParams, getUrl } = useGetParams();
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [allSongs, setAllSongs] = useState([
    { name: "Ginger", artist: "Wizkid Feat. Burna Boy" },
    { name: "Anybody", artist: "Wizkid Feat. Burna Boy" },
    { name: "Move", artist: "Bad Boy Timz" },
  ]);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const [selectedIsEmpty, setSelectedIsEmpty] = useState(true);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    setTotal(allSongs.length);
  }, []);

  const updateCount = (type) => {
    if (count == total - 1) {
      setBtnDisabled(false);
    }
    if (type == "inc") {
      if (count < total) {
        setCount((el) => ++el);
      }
    } else {
      if (count > 0) {
        setCount((el) => --el);
      }
    }
  };

  const toggleDrawer = (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpened((val) => !val);
  };

  const checkIsSelectedEmpty = (songs) => {
    let empty = true;
    songs.forEach((el) => {
      console.log("el is", el);
      if (el != null) {
        empty = false;
      }
    });

    console.log("is selected emppty", empty);
    return empty;
  };

  const onSelectSong = (song, i) => {
    setSelectedSongs((list) => {
      list[i] = song;
      console.log("newSelected is", [...list]);
      return [...list];
    });
    setSelectedIsEmpty(false);
    updateCount("inc");
  };

  const onRemoveSong = (i) => {
    // const newFriends = selectedFriends.filter((el, elI) => elI != i);
    const newSongs = [...selectedSongs];
    newSongs[i] = null;
    setBtnDisabled(true);

    console.log("on remove index", newSongs);
    setSelectedSongs(newSongs);
    setSelectedIsEmpty(checkIsSelectedEmpty(newSongs));
    updateCount();
  };

  return (
    <BaseLayout>
      {/* All Songs Drawer */}
      <Drawer
        open={isDrawerOpened}
        onClose={(e) => {
          toggleDrawer(e);
        }}
      >
        <h2 className="title_heavy mt-[2.4rem] text-black-default">Your selected songs</h2>
        <p className="caption_light mb-[1.6rem]">Select 5 songs to enter the song raffle</p>
        <Search placeholder={"Search songs"}></Search>
        {/* Selected Song */}
        <div className="mt-[2.6rem] relative flex gap-[1.5rem] items-center py-3 pb-[2.5rem] border-b mb-[2.6rem] w-full overflow-scroll scroll_hide">
          {selectedSongs.map((sng, i) => {
            return (
              sng && (
                <div key={i} className="relative">
                  <MyAvatar></MyAvatar>
                  <span className="small_light text-black-light block max-w-[40px] text-ellipsis overflow-hidden">{sng?.name}</span>
                </div>
              )
            );
          })}
        </div>

        {/* Allsongs */}
        <div className="pb-8 h-[28rem] scroll_hide overflow-scroll">
          {allSongs.map((e, i) => {
            return (
              <button
                onClick={() => {
                  console.log("get id param is", getParams("id"));
                  console.log("get url si", getUrl());
                }}
                className="flex items-center mb-[1.8rem] last:mb-0 last:pb-8  w-full"
                key={i}
              >
                <div className=" mr-[.8rem]">
                  <MyAvatar alt={e.name} src="/broken-image.jpg" />
                </div>
                <div className="flex flex-col self-start mr-auto">
                  <span className="body_heavy mb-[.2rem] text-black-default text-left">{e.name}</span>
                  <span className="small_light text-left">{e.artist}</span>
                </div>
                <Checkbox
                  // checked={isChecked}
                  onChange={(event) => {
                    // setChecked(event.target.checked);
                    console.log("check change,", event.target.checked);
                    if (event.target.checked) {
                      onSelectSong(allSongs[i], i);
                    } else {
                      onRemoveSong(i);
                    }
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 20, fill: "#110066" } }}
                />
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-full p-[1.6rem]">
          <BtnPrimary
            color="#14B363"
            disabled={btnDisabled}
            text={
              btnDisabled ? (
                <div>
                  {count} of {total} selected
                </div>
              ) : (
                "Submit"
              )
            }
          ></BtnPrimary>
        </div>
      </Drawer>

      {/* Main */}
      <HeadersV1 link={`parties/${getParams("id")}`} text={"Musicpost"}>
        <div></div>
      </HeadersV1>

      {/* Empty State */}
      {selectedIsEmpty && (
        <div className="grid place-content-center place-items-center mt-[9.2rem] relative">
          <Image width={88} height={88} alt="musical-notes" src={"/images/musical-notes.png"}></Image>
          <h2 className="headline_heavy text-black-default mb-[.8rem] mt-[3.2rem]">No Songs</h2>
          <p className="body_light mb-[4.8rem]">You have not selected any songs</p>
          <BtnPrimary
            handleClick={() => {
              setIsDrawerOpened(true);
            }}
            link={getUrl()}
            text="Select Songs"
          ></BtnPrimary>
        </div>
      )}

      {/* Selected Songs */}
      {!selectedIsEmpty && (
        <div className="mt-[2.8rem]">
          <Container>
            <h2 className="title_heavy text-black-default">Your selected songs</h2>
            <p className="caption_light mb-[1.8rem]">Select 5 songs to enter the song raffle</p>
            {/* selected songs */}
            {selectedSongs.map((e, i) => {
              return (
                e && (
                  <button onClick={() => {}} className="flex items-center mb-[1.8rem] last:mb-0 w-full" key={i}>
                    <div className=" mr-[.8rem]">
                      <MyAvatar alt={e.name} src="/broken-image.jpg" />
                    </div>
                    <div className="flex flex-col self-start mr-auto">
                      <span className="body_heavy mb-[.2rem] text-black-default text-left">{e.name}</span>
                      <span className="small_light text-left">{e.artist}</span>
                    </div>
                  </button>
                )
              );
            })}
          </Container>
        </div>
      )}
    </BaseLayout>
  );
};

export default MusicPost;
