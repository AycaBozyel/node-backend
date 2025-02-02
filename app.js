const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Node.js backend!');
});

app.get('/api/greeting', (req, res) => {
  res.json({ message: 'Hello, welcome to the Node.js backend!' });
});

app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}` });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
