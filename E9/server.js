const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;
const MONGO_URL = (process.env.MONGO_URL || "mongodb://localhost:27017").replace(/\s+/g, "");
const DB_NAME = process.env.DB_NAME || "eventdb";
const COLLECTION_NAME = "registrations";
const isAtlasConnection = MONGO_URL.startsWith("mongodb+srv://");

const client = new MongoClient(MONGO_URL);
let registrationsCollection;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const allowedEvents = [
  "Coding Challenge",
  "Debugging Contest",
  "Web Design",
  "Quiz Competition",
  "Paper Presentation",
];

function normalizeEvents(input) {
  if (Array.isArray(input)) {
    return input;
  }
  if (typeof input === "string" && input.trim()) {
    return [input];
  }
  return [];
}

async function connectToMongo() {
  await client.connect();
  const db = client.db(DB_NAME);
  registrationsCollection = db.collection(COLLECTION_NAME);
  await registrationsCollection.createIndex({ regno: 1 }, { unique: true });
  console.log(
    `Connected to ${isAtlasConnection ? "MongoDB Atlas" : "local MongoDB"} database "${DB_NAME}".`
  );
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

app.post("/register", async (req, res) => {
  try {
    const regno = String(req.body.regno || "").trim();
    const name = String(req.body.name || "").trim();
    const events = normalizeEvents(req.body.events);

    if (!regno || !name || events.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Register Number, Name, and at least one event are required.",
      });
    }

    if (events.length > 3) {
      return res.status(400).json({
        success: false,
        message: "You can select a maximum of 3 events.",
      });
    }

    const invalidEvent = events.find((event) => !allowedEvents.includes(event));
    if (invalidEvent) {
      return res.status(400).json({
        success: false,
        message: "Invalid event selection received.",
      });
    }

    const existingRegistration = await registrationsCollection.findOne({ regno });
    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: "A registration with this Register Number already exists.",
      });
    }

    const registration = { regno, name, events };
    await registrationsCollection.insertOne(registration);

    return res.status(201).json({
      success: true,
      message: "Registration submitted successfully.",
      registration,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while processing registration.",
    });
  }
});

app.get("/search", async (req, res) => {
  try {
    const regno = String(req.query.regno || "").trim();

    if (!regno) {
      return res.status(400).json({
        success: false,
        message: "Register Number is required for search.",
      });
    }

    const registration = await registrationsCollection.findOne({ regno });
    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "No registration found for this Register Number.",
      });
    }

    return res.json({
      success: true,
      regno: registration.regno,
      name: registration.name,
      events: registration.events,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error while searching registration.",
    });
  }
});

connectToMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  try {
    await client.close();
  } finally {
    process.exit(0);
  }
});
