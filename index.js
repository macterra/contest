const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Serve the React frontend
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/v1/next', async (req, res) => {
    try {
        const questions = [];

        for (let i = 1; i <= 3; i++) {
            questions.push({id: i, question: `question ${i}`});
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