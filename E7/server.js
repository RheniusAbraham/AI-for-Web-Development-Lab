// server.js
const http = require('http');

const server = http.createServer((req, res) => {
  const currentDate = new Date();
  
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Home Page\nName: AIWED-ex-7\nCurrent Date/Time: ' + currentDate);
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('About Page\nName: AIWED-ex-7\nCurrent Date/Time: ' + currentDate);
  } else if (req.url === '/contact') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Contact Page\nName: AIWED-ex-7\nCurrent Date/Time: ' + currentDate);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found\nName: AIWED-ex-7\nCurrent Date/Time: ' + currentDate);
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});