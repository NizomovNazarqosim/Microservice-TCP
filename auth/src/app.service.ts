import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto, SingInUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  // sign up part
  async signUp(body: CreateUserDto) {
    const {name, email, password} = body
    const foundUser = await this.prisma.users.findFirst({
      where: {email: email}
    })
    if(foundUser) {
      console.log(foundUser)
      return 'You are already signed up'
    }
    const hashedPassword = await this.hashPassword(password)
    if(!hashedPassword) return'Sometheng went wrong'
    const newUser = await this.prisma.users.create({
      data: {
        name: name, 
        email: email,
        password: hashedPassword
      }
    })
    return 'Registered successfully'
  }
  // sign in part
  async signIn(body: SingInUserDto) {
    const { email, password } = body
    const foundUser = await this.prisma.users.findFirst({
      where: {
        email: email
      }
    })
    if (!foundUser) return 'You have bot registered yet'
    const isMatch = await this.comparePassword({ password: password, hash: foundUser.password })
    if (!isMatch) return 'You have wrong password'
    const token = await this.signToken({
      id: foundUser.id,
      email: foundUser.email,
    })
    if(!token) return 'Internal server error'

    return token
  }
  
  // hash password
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
  }
  // compare password
  async comparePassword(args: { password: string, hash: string }) {
    return await bcrypt.compare(args.password, args.hash)
  }
  // make token
  async signToken(args: { id: string; email: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, {
      secret: '1q2w3e4r'
    })
  }
}
