import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
const prisma = new PrismaClient({log:['query']});

export interface User{
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string
    /*votedFor: Vote[]
    invitedEvent: Event[],
    createdEvent: Event[],*/
    createdAt: Date,
    updatedAt: Date
}
/*
export interface Event{
    id: string,
    name: string,
    duration: string,
    votes: Vote[],
    createdBy: User,
    participants: User[],
    userId: string,
    availableTimes: Date[],
    createdAt: Date,
    updatedAt: Date
}

export interface Vote{
    id: String,
    votedBy: User,
    userId: String,
    votedTo: Event,
    eventId: String,
    selectedTimes: Date[], // array of the selected options from availableTimes so that we know who voted for what
    createdAt: Date,
    updatedAt: Date
}*/

class AuthService{

    async register({firstName, lastName, email, password}: User){
        console.log(firstName, lastName, email, password);
        const name: string = firstName + " " + lastName;
        const pass = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await prisma.user.create({
            data:{
                name,
                password: pass,
                email,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            select:{
                name: true,
                email: true
            }
        });
        return user;
    }

    async login({email, password}: User){
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        })

        if (user){
            if(await bcrypt.compare(password, user.password)){
                return user;
            }
        }
        return null;
    }
}
const authService = new AuthService();
export default authService;