import { Router, response } from 'express';
import authService from '../services/authService';
const router = Router();

router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await authService.login(email, password);
        if(user){
            res.json(user);
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