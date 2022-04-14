import jwt_decode from "jwt-decode";

const useDecodeJWT = () => {
  //This library doesn't validate the token, any well formed JWT can be decoded.
  //You should validate the token in your server-side logic by using something like express-jwt, koa-jwt, Owin Bearer JWT, etc.
  //

  const decodeJWTClient = (token) => {
    try {
      decoded = jwt_decode(token);
      return decoded;
    } catch (error) {
      return false;
    }
  };

  const verifyTokenServer = async (verifcationLink, axiosInstance) => {
    try {
      const response = await axiosInstance.get(verifcationLink);
      return response.data;
    } catch (error) {
      return false;
    }
  };

  return { decodeJWTClient, verifyTokenServer };
};

export default useDecodeJWT;
