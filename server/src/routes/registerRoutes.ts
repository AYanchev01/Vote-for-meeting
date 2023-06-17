import { Router, response } from 'express';
import authService from '../services/authService';
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const user = await authService.register(firstName, lastName, email, password);
        res.json(user);
    }
    catch (error){
        console.error(error);
        res.sendStatus(400);   
    }
});

export default router;