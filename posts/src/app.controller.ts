import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {EventPattern} from '@nestjs/microservices'
import { CreatePostDto } from './dto/post.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('create_post')
  createPost(body: any): any {
    const response = this.appService.createPost(body.text)
    return response
  }
  @EventPattern('update_post')
  updatePost(body: any): any {
    const response = this.appService.updatePost(body.text)
    return response
  }
  @EventPattern('delete_post')
  deletePost(body: any): Promise<any> {
    const response = this.appService.deletePost(body.id)
  }
}
