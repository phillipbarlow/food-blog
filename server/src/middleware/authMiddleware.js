import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
console.log("AUTH HEADER:", req.headers.authorization);

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing token" });
  }
// console.log(authHeader)
  const token = authHeader.split(" ")[1];
  // console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);
    req.user = decoded
    console.log(req.user,"from middleware")
    console.log(token,"--from middleware")
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
