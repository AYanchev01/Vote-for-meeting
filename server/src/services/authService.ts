import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
const prisma = new PrismaClient({log:['query']});


class AuthService{

    async findUserByEmail(email:string) {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
    
        return user;
      }

    async register(firstName:string, lastName:string, email:string, password:string){
        
        const name = `${firstName} ${lastName}`;
        const pass = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const user = await prisma.user.create({
            data:{
                name: name,
                password: pass,
                email
            },
            select:{
                id: true,
                name: true,
                email: true
            }
        });
        return user;
    }

    async login(email:string, password:string){
        const user = await this.findUserByEmail(email);

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