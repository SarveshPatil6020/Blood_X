import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  jwt.verify(token.split(" ")[1], "my-secret-key", (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token." });

    req.user = user;
    next();
  });
};

export default authenticateToken;
