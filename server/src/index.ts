import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events';
import loginRoutes from './routes/login';
import registerRoutes from './routes/register';
import voteRoutes from './routes/votes';
import docsRoute from './routes/docs';

const app = express();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SERVER_URL = process.env.SERVER_URL || 'http://localhost';

app.use(express.json());
app.use(cors());

// Use the routes
app.use(eventRoutes);
app.use(loginRoutes);
app.use(registerRoutes);
app.use(voteRoutes);
app.use(docsRoute);

// Start the server
app.listen(SERVER_PORT, () => {
  console.log(`Server running on ${SERVER_URL}:${SERVER_PORT}`);
});
