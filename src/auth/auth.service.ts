import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AuthClass } from './Schema/auth.schema';
import { Document, Model } from 'mongoose';
import { LoginDto } from './Dtos/LoginDto/Login.Dto';
import { createUserDto } from './Dtos/createUserDTO/createUser.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthClass.name)
    private readonly authModel: Model<AuthClass & Document>,
  ) {}

  //Generate Token
  generateToken(user: AuthClass): string {
    const payload = {
      sub: user?._id,
      email: user?.email,
      username: user?.username,
    };
    return jwt.sign(payload, 'huzaifa@login');
  }

  //Logic For Fetching All User
  async findAll(): Promise<AuthClass[]> {
    return this.authModel.find();
  }

  //Logic For Creating New User
  async createUserID({
    username,
    password,
    email,
    phoneNumber,
  }: createUserDto): Promise<AuthClass> {
    const existingUser = await this.authModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('User Already Existed');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.authModel.create({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
    });
  }

  //Logic For Deleting Existing User
  async deleteUser(id: string): Promise<AuthClass> {
    return await this.authModel.findByIdAndDelete(id).exec();
  }

  //Logic For Login User
  async loginUser({ email, password }: LoginDto): Promise<AuthClass> {
    const user = await this.authModel.findOne({ email }).populate('posts');
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user?.password);
      if (passwordMatch) {
        this.generateToken(user);
        return user;
      }
    }
    throw new UnauthorizedException('invalid credential');
  }
}
