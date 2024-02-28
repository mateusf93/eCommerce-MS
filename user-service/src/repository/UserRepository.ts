import { PrismaClient,  User } from '@prisma/client'

export interface IUserRepository{
    getAll(): Promise<User[]> ;
    createUser(user:User): Promise<void>;
    getUserById(id: number): Promise<User | null>;
    getUserByEmail(email:string): Promise<User | null>;
    deleteUser(id:number): Promise<void>;
}
export class UserRepository implements IUserRepository {
      prisma : PrismaClient;
    static getAll: any;
  constructor(){
      this.prisma = new PrismaClient;
    }
  public async getAll(): Promise<User[]> {
    const data: User[] = await this.prisma.user.findMany();
    return data
  }

  public async createUser(user: User): Promise<void> {
    const createdUser: User = await this.prisma.user.create({
      data: user
    })

  }
  public async getUserById(id: number): Promise<User | null> {
    const user: User | null = await this.prisma.user.findUnique({
      where: {
        userId: id,
      }
    })
    return user
  }
  public async getUserByEmail(email: string): Promise<User | null> {
    const userV: User | null = await this.prisma.user.findUnique({
      where: {
        email: email,
      }
    })
    return userV
  }
  public async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        userId: id
      }
    })
  }


}