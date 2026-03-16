import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
// console.log(authHeader)
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }
// console.log(authHeader)
  const token = authHeader.split(" ")[1];
  // console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, username: decoded.username, displayname:decoded.username};
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
