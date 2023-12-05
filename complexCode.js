/* 
   Filename: complexCode.js
   Description: This code demonstrates a complex algorithm for finding the shortest path in a graph using Dijkstra's algorithm.
*/

// Define Graph class
class Graph {
  constructor() {
    this.nodes = [];
    this.edges = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = {};
  }

  addEdge(node1, node2, weight) {
    this.edges[node1][node2] = weight;
    this.edges[node2][node1] = weight;
  }

  dijkstra(startNode) {
    let distances = {};
    let visited = {};
    let previous = {};
    let queue = new PriorityQueue();

    // Initialize distances and queue
    for (let node of this.nodes) {
      distances[node] = Infinity;
      visited[node] = false;
      previous[node] = null;
    }
    distances[startNode] = 0;
    queue.enqueue(startNode, 0);

    // Dijkstra's algorithm
    while (!queue.isEmpty()) {
      let current = queue.dequeue().data;
      visited[current] = true;

      for (let neighbor in this.edges[current]) {
        let weight = this.edges[current][neighbor];
        let newDistance = distances[current] + weight;

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;
        }

        if (!visited[neighbor]) {
          queue.enqueue(neighbor, distances[neighbor]);
        }
      }
    }

    return { distances, previous };
  }

  getPath(startNode, endNode) {
    let { distances, previous } = this.dijkstra(startNode);
    let path = [endNode];
    let current = previous[endNode];

    while (current) {
      path.unshift(current);
      current = previous[current];
    }

    if (distances[endNode] !== Infinity) {
      return path;
    }

    return [];
  }
}

// Define PriorityQueue class for Dijkstra's algorithm
class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  isEmpty() {
    return this.elements.length === 0;
  }

  enqueue(data, priority) {
    this.elements.push({ data, priority });
    this.sort();
  }

  dequeue() {
    return this.elements.shift();
  }

  sort() {
    this.elements.sort((a, b) => a.priority - b.priority);
  }
}

// Create a sample graph
let myGraph = new Graph();
myGraph.addNode("A");
myGraph.addNode("B");
myGraph.addNode("C");
myGraph.addNode("D");
myGraph.addNode("E");
myGraph.addEdge("A", "B", 4);
myGraph.addEdge("A", "C", 2);
myGraph.addEdge("B", "E", 3);
myGraph.addEdge("C", "D", 2);
myGraph.addEdge("D", "E", 3);

// Find the shortest path from node A to node E
let shortestPath = myGraph.getPath("A", "E");

// Output the result
console.log("Shortest Path:", shortestPath);
