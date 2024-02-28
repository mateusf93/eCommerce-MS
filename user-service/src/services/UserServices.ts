import  {UserRepository}  from "../repository/UserRepository";
import { User } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export interface Token {
    user: string,
    token:string
}

export interface ErroLogin{
    message: string
}


export class UserService{
    private readonly userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepository;
    }
    private readonly saltRounds = 10;
    async hashPassword(password:string){
        return bcrypt.hash(password, this.saltRounds)

    }

    async createUser(user: User):Promise<User>{
        const hashPassword = await this.hashPassword(user.password);
         const userCreated : User = user
        await this.userRepository.createUser(userCreated)
         return userCreated
     }

     async getEmail(email:string):Promise<User | null>{
        const userCheck : User | null = await this.userRepository.getUserByEmail(email);
        return userCheck;
    }

    async getUserById(id:number): Promise<User | null>{
        const user : User | null = await this.userRepository.getUserById(id);
        return user
    }
    async getAllUser(): Promise<User[]>{
        const users : User[] = await this.userRepository.getAll();
        return users
    }
    
    async getTokenInfo(token:string): Promise<User | unknown>{
        const userInfo : any = jwt.decode(token);
        const userInfoId =  this.getUserById(userInfo.id)
        console.log(userInfoId)
        return userInfoId;
    }
    async login(email:string, password:string): Promise<Token | ErroLogin>{
        try{
            const user: User | any = await this.userRepository.getUserByEmail(email)
            console.log(user)
            if(!user){
                return {
                    message:"Usuário não existe!"
                }
            }
            const verifyPass = await bcrypt.compare(password, user.password)
            console.log(verifyPass)
            if(!verifyPass){
                return {
                    message:"Usuário ou Senha Incorretos!"
                }
            }
            if(verifyPass){
                console.log("Login Correto")
            }
            const token = jwt.sign({id: user.id}, process.env.JWT_PASS ?? '',{expiresIn:'1h'
        })
        console.log(token)
        
        const returnToken : Token = {
            user:user.name,
            token:token
        }
        return  returnToken
        }catch{
            return {
                message:"Usuário ou Senha I!"
            }
        }
      
}
}
