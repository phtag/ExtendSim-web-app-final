const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    res.status(401).json({
      error: "Not Authenticated"
    });
  }

  jwt.verify(token.replace("Bearer ", ""), process.env.TOKEN_SECRET, function(err, decoded) {
    if (err) {
      console.error(err);
      res.status(401).json({
        error: "Not Authenticated"
      });
    }
    req.user = decoded;
    next();
  });
}

