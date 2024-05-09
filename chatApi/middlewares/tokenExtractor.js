const axios = require("axios");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("Authorization").trim();
  console.log(".", authorization, ".");
  try {
    const response = await axios.get(
      "http://main_api:3000/api/validate_token",
      {
        headers: {
          Authorization: authorization,
        },
      }
    );
    if (response.status !== 200) throw new Error("Invalid token");
    console.log("response.data = ", response.data);
    req.decodedToken = response.data;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "invalid token" });
  }
};

module.exports = { tokenExtractor };
