# AIWD-EX-7: Node.js HTTP Server

This repository contains a simple Node.js HTTP server built using the native `http` module.

## Features
- **Routing:** Handles multiple routes: `/`, `/about`, and `/contact`.
- **404 Handling:** Returns a "404 Not Found" message for any other routes.
- **Dynamic Content:** Each response includes the page name, project name (`AIWED-ex-7`), and the current date/time.
- **Port:** Runs on port `3000`.

## How to Run
1. Ensure you have Node.js installed.
2. Run the server:
   ```bash
   node server.js
   ```
3. Open your browser and visit:
   - `http://localhost:3000/`
   - `http://localhost:3000/about`
   - `http://localhost:3000/contact`

## Endpoints
- `/` - Home Page
- `/about` - About Page
- `/contact` - Contact Page
- `/*` - 404 Not Found
