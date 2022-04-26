export const determineUnit = (val) => {
  // switch (parseInt(val).toString().length) {
  //   case 6 || 5 || 4:
  //     console.log("value unit is thousand");
  //     return "K";
  //     break;
  //   case 7:
  //     console.log("value unit is hundred");
  //     return "M";
  //     break;
  //   case 3:
  //     return "";
  //     break;

  //   default:
  //     break;
  // }
  const number = parseInt(val).toString().length;
  if (number == 6 || number == 5 || number == 4) {
    return "k";
  } else if (number > 7) {
    return "M";
  } else {
    return "";
  }
};
