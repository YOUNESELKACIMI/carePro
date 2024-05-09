const axios = require("axios");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    let token = authorization.substring(7).trim();
    console.log(".", token, ".");
    try {
      const response = await axios.get(
        "http://localhost:3000/api/validate_token",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status !== 200) throw new Error("Invalid token");
      console.log("response.data = ", response.data);
      req.decodedToken = response.data;
      next();
    } catch (err) {
      return res.status(401).json({ error: "invalid token" });
    }
  } else {
    return res.status(401).json({ error: "missing token" });
  }
};

module.exports = { tokenExtractor };
