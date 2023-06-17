import { Router, response } from 'express';
import authService from '../services/authService';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await authService.login(email, password);
        if(user){
            const accessToken = jwt.sign(
                { userID: user.id},
                process.env.ACCESS_TOKEN_SECRET as string,
                { expiresIn: 86400 }
            );
            console.log()
            res.json({ accessToken: accessToken });
        }
        else{
            res.sendStatus(401);
        }
    }
    catch(error){
        console.error(error);
        res.sendStatus(400);
    }
})

export default router;