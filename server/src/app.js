import express from "express";
import cors from "cors";

const app = express();

// Allow your React app to access your API
app.use(cors({
  origin: "http://localhost:5173",
}));

// Allow your server to read JSON bodies
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send("API is running 🎉 home!!!");
});

app.get("/recipes", (req, res) => {
  res.json([
    { id: 1, title: "Pizza" },
    { id: 2, title: "Pasta" }
  ]);
});

app.get("/comments", (req, res) => {
  res.json([
    { id: 1, text: "Great recipe!" },
    { id: 2, text: "Love this one!" }
  ]);
});

export default app;
