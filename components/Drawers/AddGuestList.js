import { Avatar, Checkbox } from "@mui/material";
import React from "react";
import MyAvatar from "../Avatar";
import BtnPrimary from "../Buttons/BtnPrimary";
import Drawer from "../Drawer";
import BaseLayout from "../Layouts/Layout";
import Search from "../Search";
import { useState } from "react";

const AddGuestList = ({ isDrawerOpened = false, onClose }) => {
  const [activeDrawer, setActiveDrawer] = useState();
  const [guestList, setGuestList] = useState([
    { name: "Ada Lovace", username: "@lovace", about: " I love football and food, I’m a product manager and I love to have fun and party 🎉" },
    {
      name: "Madison Blackstone",
      username: "@madisonblackstone",
      about: " Madison Blackstone is a director of brand marketing, with experience managing global teams and multi-million-dollar campaigns.",
    },
  ]);

  const [friendsList, setFriendsList] = useState([
    { name: "Ada Lovace", username: "@lovace" },
    {
      name: "Madison Blackstone",
      username: "@madisonblackstone",
    },
  ]);

  const [selectedFriends, setSelectedFriends] = useState([]);

  const [activeUserIndex, setActiveUserIndex] = useState(0);

  //   const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  //   const router = useRouter();

  const openGuestListDrawer = (i) => {
    setIsDrawerOpened(true);
    setActiveDrawer("guest-list");
    setActiveUserIndex(i);
  };

  const toggleSelectFriend = (i) => {
    setFriendsList((list) => {
      const friend = list[i];
      friend.checked = !friend.checked;
      const newList = list;
      newList[i] = friend;
      console.log(newList);
      return [...newList];
    });
  };

  const onSelectFriend = (friend, i) => {
    setSelectedFriends((list) => {
      console.log("setting friends", friend);
      // list.push(friend);
      list[i] = friend;
      console.log("newSelected is", [...list]);
      return [...list];
    });
  };

  const onRemoveFriend = (i) => {
    // const newFriends = selectedFriends.filter((el, elI) => elI != i);
    const newFriends = [...selectedFriends];
    newFriends[i] = null;

    console.log("on remove index", i);
    setSelectedFriends(newFriends);
  };

  const toggleDrawer = (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    // setIsDrawerOpened((val) => !val);
  };

  return (
    <>
      {/* Add Guest List Drawer */}
      <BaseLayout>
        <Drawer
          open={isDrawerOpened}
          onClose={(e) => {
            toggleDrawer(e);
            onClose();
            setSelectedFriends([]);
          }}
        >
          {/* Guestlist Drawer */}
          {activeDrawer == "guest-list" && (
            <div>
              <MyAvatar height="60px" width="60px" alt={guestList[activeUserIndex].name}></MyAvatar>
              <h3 className="subheader_heavy mt-[1.6rem]">{guestList[activeUserIndex].name}</h3>
              <span className="caption_light text-black-default mb-[1.6rem] mt-[.4rem] block ">{guestList[activeUserIndex].username}</span>
              <p className="mb-[3.2rem] text-black-default body_light">{guestList[activeUserIndex].about}</p>
              <BtnPrimary color="#14B363" text={"Give celebrant badge"}></BtnPrimary>
            </div>
          )}

          {/* Friends List Drawer */}

          <div>
            <h3 className="title_heavy text-black-default">Add friends</h3>
            <p className="caption_light text-black-default mb-[1.7rem]">You can add more friends to this party</p>
            <Search placeholder={"Search friends"}></Search>
            {/* Share Party link */}
            <button className="mt-[2.6rem] flex items-center pb-[2.5rem] border-b mb-[2.6rem] w-full">
              <div className="h-[4rem] w-[4rem] rounded-[1rem] bg-slate-300"></div>
              <div className="ml-[.8rem]">
                <p className="body_heavy text-black-default text-left">Share party link</p>
                <p className="small_light text-black-light">Share Shout Interactive with your friends</p>
              </div>
            </button>

            {/* Selected Friends */}
            <div className="mt-[2.6rem] relative flex gap-[1.5rem] items-center py-3 pb-[2.5rem] border-b mb-[2.6rem] w-full overflow-scroll scroll_hide">
              {selectedFriends.map((fr, i) => {
                return (
                  fr && (
                    <div key={i} className="relative">
                      <MyAvatar></MyAvatar>
                      <span className="small_light text-black-light block max-w-[40px] text-ellipsis overflow-hidden">{fr?.username}</span>
                    </div>
                  )
                );
              })}
            </div>

            {/* Friends Lists */}
            {friendsList.map((e, i) => {
              return (
                <button
                  onClick={() => {
                    // toggleSelectFriend(i);
                    // toggleSelectFriend(i);

                    // setIsChecked((val) => !val);
                    console.log(friendsList[i].checked);

                    //   openGuestListDrawer(i);
                  }}
                  className="flex items-center mb-[1.8rem] last:mb-0 w-full"
                  key={i}
                >
                  <div className=" mr-[.8rem]">
                    <Avatar sx={{ borderRadius: "10px" }} alt={e.name} src="/broken-image.jpg" />
                  </div>
                  <div className="flex flex-col self-start mr-auto">
                    <span className="body_heavy mb-[.2rem] text-black-default">{e.name}</span>
                    <span className="small_light text-left">{e.username}</span>
                  </div>
                  <Checkbox
                    checked={friendsList[i].checked}
                    onChange={(event) => {
                      // setChecked(event.target.checked);
                      console.log("check change,", event.target.checked);
                      if (event.target.checked) {
                        onSelectFriend(friendsList[i], i);
                      } else {
                        onRemoveFriend(i);
                      }
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 20, fill: "#110066" } }}
                  />
                </button>
              );
            })}
            <BtnPrimary color="#14B363" text={"Add"}></BtnPrimary>
          </div>
        </Drawer>
      </BaseLayout>
    </>
  );
};

export default AddGuestList;
