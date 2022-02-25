const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const createPasswordToHash = (password) => {
  return CryptoJS.HmacSHA256(
    password,
    CryptoJS.HmacSHA1(process.env.APP_PASSWORD_HASH, password).toString()
  ).toString();
};

const generateAccessToken = (user) => {
  return JWT.sign(user, process.env.APP_TOKEN_HASH, { expiresIn: "1w" });
};

const verifyToken = (token) => {
  return JWT.verify(token, process.env.APP_TOKEN_HASH);
};

module.exports = {
  createPasswordToHash,
  generateAccessToken,
  verifyToken,
};
