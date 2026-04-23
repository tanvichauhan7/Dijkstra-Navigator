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

  // calculate distance
  const dx = start[0] - end[0];
  const dy = start[1] - end[1];
  const distance = Math.sqrt(dx * dx + dy * dy) * 111; // approx km

  const path = [start, end];

  res.json({ path, distance: distance.toFixed(2) });
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://127.0.0.1:5000");
});