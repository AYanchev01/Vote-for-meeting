import { Router, response } from 'express';
import authService, { User } from '../services/Auth-service';
const router = Router();

router.post('/', async (req, res) => {
    try {
        const data: User = req.body;
        const user = await authService.login(data);
        console.log("-----------------------", user?.email);
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