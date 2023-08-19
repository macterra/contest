const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const app = express();

const lines = fs.readFileSync('questions.txt', 'utf-8').split('\n');
const questions = [];
let id = 1;

for (let i = 0; i < lines.length; i += 2) {
    const question = lines[i];
    const values = lines[i + 1].split(',').map(Number);
    const evidence = { '+': values[0], '?': values[1], '-': values[2] };
    questions.push({ id, question, evidence });
    id += 1;
}

console.log(JSON.stringify(questions, null, 2));

app.use(morgan('dev'));
app.use(express.json());

// Serve the React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/v1/next', async (req, res) => {
    try {
        const questions = [];

        for (let i = 1; i <= 3; i++) {
            questions.push({ id: i, question: `question ${i}` });
        }

        res.json(questions);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error fetching questions' });
    }
});

app.use((req, res, next) => {
    if (!req.path.startsWith('/api')) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    } else {
        console.warn(`Warning: Unhandled API endpoint - ${req.method} ${req.originalUrl}`);
        res.status(404).json({ message: 'Endpoint not found' });
    }
});

app.listen(3000, () => {
    console.log(`contest server running on port 3000`);
});