import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes';
import loginRoutes from './routes/loginRoutes';
import registerRoutes from './routes/registerRoutes';
import votes from './routes/votes';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Use the routes
app.use(eventRoutes);
app.use(loginRoutes);
app.use(registerRoutes);

app.use(votes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
