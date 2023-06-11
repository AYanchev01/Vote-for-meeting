import express from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const SALT_ROUNDS = process.env.SALT_ROUNDS || 10;
const prisma = new PrismaClient({log: ['query']});


const PORT = Number(process.env.SERVER_PORT || 3000);
const app = express();

app.get('^$', (req, res, next) => {
    fs.readFile(path.resolve('./build/index.html'), 'utf-8', (error, data) => {
        if(error){
            console.log(error);
            return res.status(500);
        }
        return res.send(data.replace('<div id= "root"/>', '<div id="root">${ReactDOMServer.renderToString(<App/>)}</div>'));
    })
})

app.use(express.static(path.resolve(__dirname, '..', 'build')))

app.listen(PORT, () => {
    console.log(`App launched on ${PORT}`);
  });

// async function main() {
//     const password = await bcrypt.hash('password', 10);

// }
// app.use(express.json());

// app.get('/', (request, response) => {
//     response.send('Hello from server');
// });