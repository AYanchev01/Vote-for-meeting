import express, {Response, Request} from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;

const PORT = Number(process.env.SERVER_PORT || 3000);
const app = express();

async function main() {
    const password = await bcrypt.hash('password', 10);

}
app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello from server');
});

app.post('/login', async (req, res) => {
});
  
app.post('/register', async (req, res) => {
});

app.listen(PORT, () => {
    console.log(`Listen on port ${PORT}`);
});