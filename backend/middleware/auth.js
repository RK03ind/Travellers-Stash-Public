const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json("No authentication token, access denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SALT);

    if (!verified)
      return res
        .status(401)
        .json("Token verification failed, authorization denied");

    req.user = verified.id;
  } catch (error) {
    return res.status(401).json("Invalid token");
  }
  next();
};

module.exports = auth;
