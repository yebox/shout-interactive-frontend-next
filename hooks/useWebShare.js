const useWebShare = () => {
  //Share file function
  const shareLink = async (data) => {
    try {
      await navigator.share(data);
      return "success";
    } catch (error) {
      console.log("An error has occured", error.name);
      // alert(`An error has occured ${error.name}`);
      return error.name;
    }
  };

  return { shareLink };
};

export default useWebShare;
