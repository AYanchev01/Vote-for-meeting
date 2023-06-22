import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events';
import loginRoutes from './routes/login';
import registerRoutes from './routes/register';
import voteRoutes from './routes/votes';
import docsRoute from './routes/docs';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Use the routes
app.use(eventRoutes);
app.use(loginRoutes);
app.use(registerRoutes);
app.use(voteRoutes);
app.use(docsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
