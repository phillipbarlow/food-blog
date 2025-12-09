import express from "express";
import cors from "cors";
import recipesRouter from "./routes/recipesRouter.js";
import commentRouter from "./routes/commentsRouter.js";
import authRouter from "./routes/authRouter.js";
const app = express();

// Allow your React app to access your API
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🎉 home!!!");
});

// Routes
app.use("/recipes", recipesRouter);
app.use("/comments", commentRouter);
app.use("/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
  });
});

export default app;
