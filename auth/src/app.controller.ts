import { Controller, Get, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import {EventPattern, MessagePattern} from '@nestjs/microservices'
import { CreateUserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('message_printed')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.text)
  }
  
  @MessagePattern('register')
  async handleRegister(data: any) {
    const response = await this.appService.signUp(data.data);
   return response
  }
  @MessagePattern('signin')
  async signIn(data: any) {
    const response = await this.appService.signIn(data.data)
    return response
  }

  @MessagePattern('logout')
  async logout(data: any) {
    console.log(data)
  }

}
