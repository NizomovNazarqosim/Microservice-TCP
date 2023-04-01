import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Transport } from '@nestjs/microservices/enums';
import { ClientsModule } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP
      }
    ]), JwtModule, PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
