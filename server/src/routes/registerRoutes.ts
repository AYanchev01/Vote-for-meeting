import { Router, response } from 'express';
import authService, { User } from '../services/Auth-service';
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const data: User = req.body;
        console.log("--------------------"+ data);
        const user = await authService.register(data);
        res.json(user);
    }
    catch (error){
        console.error(error);
        res.sendStatus(400);   
    }
});

export default router;