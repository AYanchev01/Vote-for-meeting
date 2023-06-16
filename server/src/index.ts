import express, { Request, Response } from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import loginRoutes from './routes/loginRoutes';
import registerRoutes from './routes/registerRoutes';
import path from 'path'
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());


app.use(eventRoutes)
app.use(loginRoutes);
app.use(registerRoutes);

app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(bodyParser.json());
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});


// // Use the routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
