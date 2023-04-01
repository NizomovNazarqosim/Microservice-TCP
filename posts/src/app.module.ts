import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from '@nestjs/microservices'
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST',
        transport: Transport.TCP
      }
    ]), PrismaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
