# AIWD-EX-8: Event Registration System

A modern, full-stack event registration application built with **Node.js** and **Express**. This project features a responsive frontend, client-side/server-side validation, and a mock in-memory database for quick testing.

## 🚀 Features
- **Modern UI:** Clean, responsive form design with custom CSS.
- **Event Validation:** Restricts participants to a maximum of 3 events.
- **Search Functionality:** Admin page to search for registered participants by Register Number.
- **Backend:** Node.js/Express server handling POST (registration) and GET (search) requests.
- **Mock DB:** Uses an in-memory array to store data, making it easy to run without MySQL setup.

## 📁 Project Structure
- `index.html`: The main event registration form.
- `admin.html`: The admin search dashboard.
- `style.css`: Custom styling for both pages.
- `script.js`: Frontend logic and API integration.
- `server.js`: Node.js/Express backend server.

## 🛠️ How to Run
1. Navigate to the folder:
   ```bash
   cd AIWED-ex-8
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open `index.html` in your browser.

## 📸 Output Preview
![Output Screenshot](screenshot.png)

> **Note:** Please save your output screenshot as `screenshot.png` in this folder to make it visible in the README above.
