/* eslint-env node */
import "dotenv/config";
import app from "./src/app.js";

const PORT = Number(process.env.PORT) || 5001;

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV}`);
});
