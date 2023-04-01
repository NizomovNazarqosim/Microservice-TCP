import { Controller, Get, Inject, Post, Body, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto, SignInUserDto } from './dto/users.dto';
import { BodyMessage, Message } from './message.event';

@Controller()
export class AppController {
  constructor(
    @Inject('AUTHENTICATION') private readonly client: ClientProxy,
    @Inject('POST') private readonly clientPost: ClientProxy
  ) { }

  async onApplicationBootstrap() {
    await this.client.connect()
  }

  @Get()
  getHello(): string {
    console.log('okkkkk')
    this.client.emit<any>('message_printed', new Message('Hello World'));
    return 'Hello world printed from gateway';
  } 
  @Post('/signup')
  async register(@Body() body: CreateUserDto): Promise<any> {
    const response = await this.client.send<CreateUserDto>('register', new BodyMessage(body)).toPromise();
    return response
  }
  @Post('/signin')
  async signIn(@Body() body: SignInUserDto): Promise<any> {
    const response = await this.client.send<SignInUserDto>('signin', new BodyMessage(body)).toPromise();
    return response
  }
  @Post('/logout')
  async logout(@Body() body: {id: string}): Promise<any> {
    const response = await this.client.send<any>('logout', new Message(body.id)).toPromise();
    return response
  }
  @Post('/post')
  async createPost(@Body() body): Promise<any> {
    const response = await this.clientPost.send<any>('create_post', new Message(body)).toPromise();
    return response
  }
  @Put('/update')
  async updatePost(@Body() body): Promise<any> {
    const response = await this.clientPost.send<any>('update_post', new Message(body)).toPromise();
    return response
  }

}
