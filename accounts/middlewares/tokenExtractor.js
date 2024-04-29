const jwt = require("jsonwebtoken");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    console.log("authorization = ", authorization.substring(7));
    try {
      req.decodedToken = jwt.verify(
        authorization.substring(7),
        process.env.SECRET
      );
    } catch (err) {
      return res.status(401).json({ error: "invalid token" });
    }
  } else {
    return res.status(401).json({ error: "missing token" });
  }
  next();
};

module.exports = tokenExtractor;
