const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend working ✅");
});

// Main API
app.post("/shortest-path", (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Straight line path
  const path = [start, end];

  res.json({ path });
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://127.0.0.1:5000");
});