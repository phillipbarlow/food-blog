import express from "express";
import cors from "cors";
import recipesRouter from "./routes/recipes.js";
import commentRouter from "./routes/comments.js";
const app = express();

app.use((req, res, next) => {
  next();
});
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

app.use("/recipes", recipesRouter);
app.use("/comments", commentRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.originalUrl} does not exist`,
  });
});

export default app;
