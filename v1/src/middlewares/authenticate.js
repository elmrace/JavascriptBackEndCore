const auth = require("../scripts/utils/auth");
const httpStatus = require("http-status");

const authenticaToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    auth.verifyToken(token, process.env.APP_TOKEN_HASH);
    next();
  } catch (e) {
    res.status(httpStatus.UNAUTHORIZED).send({ error: e.message });
  }
};

module.exports = authenticaToken;
