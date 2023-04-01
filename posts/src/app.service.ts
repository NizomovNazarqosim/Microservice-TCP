import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma: PrismaService
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createPost(body: CreatePostDto) {
    const response = await this.prisma.posts.create({
      data: {
        from_user: body.from_user,
        title: body.title,
        to_whom: body.to_whom,
      }
    })
    return response
  }
  async updatePost(body: UpdatePostDto) {
    const response = await this.prisma.posts.update({
      data: {
        title: body.title
      },
      where: {
        id: body.id
      }
    })
    return response
  }
  async deletePost(body: { id: string }) {
    const response = await this.prisma.posts.delete({
      where: {
        id: body.id
      }
    })
    return response
  } 
  async getAllPost() {
    const response = await this.prisma.posts.findMany()
    return response
  }
  async getOnePost(body: { id: string }) {
    const response = await this.prisma.posts.findFirst({
      where: {
        id: body.id
      }
    })
    return response
  }

}
