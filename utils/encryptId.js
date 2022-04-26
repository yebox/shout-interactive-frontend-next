import AES from "crypto-js/aes";
import { enc } from "crypto-js";

export const encryptId = (str) => {
  const ciphertext = AES.encrypt(str, "mOhL95dmdjdpdYpgYTf8qLmssV5Px7sUpj");
  // return encodeURIComponent(ciphertext.toString());
  return ciphertext.toString();
};
