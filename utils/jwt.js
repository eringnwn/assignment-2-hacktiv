const secret = "secretcuy";
var jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  const token = jwt.sign(
    payload,
    secret,
    {
      expiresIn: "24h", // 24 hours
    }
  );
  return token;
}

exports.verify = (accessToken) => {
  jwt.verify(accessToken, secret);
}