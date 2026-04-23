const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* GRAPH */
const graph = {
  A: { B: 5, C: 2 },
  B: { A: 5, D: 1 },
  C: { A: 2, D: 7 },
  D: { B: 1, C: 7 }
};

/* DIJKSTRA */
function dijkstra(graph, start, end) {
  let distances = {};
  let prev = {};
  let visited = new Set();

  for (let node in graph) {
    distances[node] = Infinity;
  }

  distances[start] = 0;

  while (true) {
    let closest = null;

    for (let node in distances) {
      if (!visited.has(node)) {
        if (closest === null || distances[node] < distances[closest]) {
          closest = node;
        }
      }
    }

    if (closest === null) break;
    if (closest === end) break;

    visited.add(closest);

    for (let neighbor in graph[closest]) {
      let newDist = distances[closest] + graph[closest][neighbor];

      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        prev[neighbor] = closest;
      }
    }
  }

  // build path
  let path = [];
  let curr = end;

  while (curr) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return path;
}

/* API */
app.post("/shortest-path", (req, res) => {
  const { start, end } = req.body;

  const path = dijkstra(graph, start, end);

  res.json({ path });
});

/* START SERVER */
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});