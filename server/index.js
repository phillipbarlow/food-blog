/* eslint-env node */
import "dotenv/config";
import app from "./src/app.js";

const PORT = Number(process.env.PORT) || 5001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  // console.log("JWT_SECRET exists?", !!process.env.JWT_SECRET);
});
// console.log("ENV DATABASE_URL exists?", !!process.env.DATABASE_URL);
