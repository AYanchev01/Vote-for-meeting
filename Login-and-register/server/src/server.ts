import express from 'express';
import bodyParser from 'body-parser';
import authRouter from './router/auth-router';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client'
import path from 'path'

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const prisma = new PrismaClient({log: ['query']});
dotenv.config();

const PORT = Number(process.env.SERVER_PORT || 3000);

const app = express(); 
app.use(express.static(path.join(__dirname, '../../client/build')));
app.use(bodyParser.json());

// Register the auth router
//app.use('/api/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});