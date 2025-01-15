const jwt = require("jsonwebtoken");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    let token = authorization.substring(7).trim();
    console.log(".", token, ".");
    try {
      req.decodedToken = jwt.verify(token, process.env.SECRET);
      req.user = req.decodedToken;
      req.access_token = token;
      next();
    } catch (err) {
      return res.status(401).json({ error: "invalid token" });
    }
  } else {
    return res.status(401).json({ error: "missing token" });
  }
};

module.exports = { tokenExtractor };