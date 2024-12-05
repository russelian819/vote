const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Simulated database
const votes = {
    "Candidate 1": 0,
    "Candidate 2": 0,
    "Candidate 3": 0,
};

// **Add this route for the root path**
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to the Voting System</h1>
        <p>Use the endpoints:</p>
        <ul>
            <li><strong>POST /vote</strong>: Cast your vote (requires candidate name in the body).</li>
            <li><strong>GET /summary</strong>: View the summary of votes.</li>
        </ul>
    `);
});

// Endpoint to cast a vote
app.post("/vote", (req, res) => {
    const { candidate } = req.body;

    if (!votes.hasOwnProperty(candidate)) {
        return res.status(400).json({ message: "Invalid candidate." });
    }

    votes[candidate] += 1;
    res.json({ message: "Vote recorded.", votes });
});

// Endpoint to fetch the summary
app.get("/summary", (req, res) => {
    res.json(votes);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
