import { Chip } from "@mui/material";
import React, { useRef } from "react";
import { useState } from "react";
import MyAvatar from "./Avatar";

const InputTag = ({ status, onChange }) => {
  const [tags, setTags] = useState([]);
  const [activeText, setActiveText] = useState("  ");
  const inputRef = useRef(null);

  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  const handleDelete = (i) => {
    console.info("You clicked the delete icon.");
    const newTags = tags.filter((el, index) => index != i);
    setTags(newTags);
  };
  const onAddItem = (e) => {
    // console.log("key event is", inputRef.current.innerText, inputRef.current);
    if (e.key == "Enter" || e.key == " ") {
      if (inputRef.current.innerText.trim() == "") {
        console.log("Empty innerText");
      } else {
        setTags([...tags, inputRef.current.innerText.trim()]);
        onChange([...tags, inputRef.current.innerText.trim()]);
      }
      inputRef.current.innerText = "";
    }

    if (e.key == "Backspace" && inputRef.current.innerText == "") {
      console.log("Backspace Reached", inputRef.current.innerText);
      console.log(tags);
      inputRef.current.innerText = tags[tags.length - 1] ?? "";
      inputRef.current.focus();
      setTags((val) => val.slice(0, -1));
    }
  };
  return (
    <div
      onClick={() => {
        console.log("box clekeds");
        inputRef.current.focus();
      }}
      //   className=" bg-slate-600 border-2 border-red-500 "
      className={` min-h-[48px] border-2 mb-[10px] max-w-full min-w-[200px] w-full text-black-default body_light focus:border-primary focus:outline-0 ${
        status == "warn" ? `border-warn-default opacity-50` : "border-gray-light"
      } ${status == "error" ? "border-error-default focus:!border-error-default" : "border-gray-light"} border rounded-[16px] px-[8px] py-[14px] overflow-hidden`}
    >
      <p className="inline w-min" contentEditable={false}>
        {tags.map((e, i) => {
          return (
            <span className="m-1 inline-flex" key={i} contentEditable={false}>
              <Chip
                sx={{ paddingLeft: "8px" }}
                avatar={<MyAvatar height="24px" width="24px"></MyAvatar>}
                label={e}
                variant="outlined"
                onClick={handleClick}
                onDelete={() => {
                  handleDelete(i);
                }}
              />
            </span>
          );
        })}
      </p>
      <span ref={inputRef} className=" inline-block min-w-max h-full focus:border-0 focus:outline-none leading-3" onKeyDown={onAddItem} contentEditable={true}></span>
      {/* <input ref={inputRef} className=" inline w-[8rem] bg-red-200 h-full focus:border-0 focus:outline-none my-auto leading-3" onKeyDown={onAddItem} /> */}
    </div>
  );
};

export default InputTag;
