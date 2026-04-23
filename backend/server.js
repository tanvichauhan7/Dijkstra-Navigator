const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Simple Dijkstra-style placeholder (direct path)
app.post("/shortest-path", (req, res) => {
  const { start, end } = req.body;

  if (!start || !end) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Straight line path (for now)
  const path = [start, end];

  res.json({ path });
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});