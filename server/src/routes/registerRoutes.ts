import { Router, response } from 'express';
import authService, { User } from '../services/Auth-service';
const router = Router();

router.post('/register', async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        const name = firstName + " " + lastName;
        const data: User= {
            id: "",
            email: email,
            name:name,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date()
    };
        const user = await authService.register(data);
        res.json(user);
    }
    catch (error){
        console.error(error);
        res.sendStatus(400);   
    }
});

export default router;