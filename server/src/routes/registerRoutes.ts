import { Router, response } from 'express';
import authService from '../services/authService';
import jwt from 'jsonwebtoken';
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.sendStatus(409);
        }
        const user = await authService.register(firstName, lastName, email, password);
        const accessToken = jwt.sign(
            { userID: user.id},
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: 86400 }
        );
        res.json(accessToken);
    }
    catch (error){
        console.error(error);
        res.sendStatus(400);   
    }
});

export default router;