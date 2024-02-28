import { User } from "@prisma/client";
import { ErroLogin, Token, UserService } from "../services/UserServices";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserRepository } from "../repository/UserRepository";

const userService = new UserService


export class UserController {
    
    static async createUser(req: Request, res: Response) {
        const user: User = req.body;
        try {
           
            const userCreated: User = await userService.createUser(user);
           
            res.status(201).send(userCreated)
        } catch(error) {
            const checkEmail = await userService.getEmail(req.body.email);
            console.log(error)
            if (checkEmail) {
                res.status(401).send({ message: "Usuário já existe" });
            } else {
                res.send({
                    message: "Não foi possível criar o usuário!"
                }).status(400);
            }
        }

    }

    static async getUsers(req:Request, res:Response){
        try{
            const users : User[] = await userService.getAllUser();
            res.send(users).status(200)
        }catch(error){
            res.send({
                message: "Erro"
            }).status(400);
        }
    }

    static async login(req:Request, res:Response){
        const email : string = req.body.email;
        const password : string = req.body.password;
        try{
            const sucessLogin : Token | ErroLogin = await userService.login(email, password);
            res.send(sucessLogin).status(200)

        }
        catch{
            res.send({
                message: "Erro"
            }).status(400);
        }
        
    }
    static async getInfoByToken(req:Request, res:Response){
        let token = req.headers
        const token1 : any = token.authorization?.slice(7)

        const userinfo = await userService.getTokenInfo(token1)
        return res.send(userinfo);
    }
    
}