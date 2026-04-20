const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));

// --- MOCK DATABASE (No MySQL needed) ---
let registrations = []; 

// Part 2: POST endpoint for registration
app.post('/register', (req, res) => {
    const { regNumber, fullName, events } = req.body;

    // Server-side validation
    if (!events || !Array.isArray(events) || events.length === 0) {
        return res.status(400).json({ message: 'Select at least one event.' });
    }
    if (events.length > 3) {
        return res.status(400).json({ message: 'Maximum 3 events allowed.' });
    }

    // Check if user already exists
    const index = registrations.findIndex(r => r.regno === regNumber);
    const eventsStr = events.join(', ');

    if (index !== -1) {
        // Update existing
        registrations[index] = { regno: regNumber, name: fullName, events: eventsStr };
    } else {
        // Add new
        registrations.push({ regno: regNumber, name: fullName, events: eventsStr });
    }

    console.log('Current Database:', registrations);
    res.json({ message: `Registration successful for ${fullName}!` });
});

// Part 4: GET endpoint for admin search
app.get('/search/:regno', (req, res) => {
    const regno = req.params.regno;
    const user = registrations.find(r => r.regno === regno);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Register number not found.' });
    }
});

// NEW: Endpoint to see everything in the database
app.get('/all', (req, res) => {
    res.json(registrations);
});

app.listen(port, () => {
    console.log(`\n🚀 Server running at http://localhost:${port}`);
    console.log(`💡 NOTE: Using In-Memory storage. Data will reset if you restart the server.\n`);
});
