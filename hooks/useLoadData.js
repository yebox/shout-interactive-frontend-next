const useLoadData = () => {
  const getData = async (axiosInstance, url, data) => {
    try {
      const resp = await axiosInstance.post(url, data);
      return resp.data;
    } catch (error) {
      return false;
    }
  };

  return { getData };
};

export default useLoadData;
