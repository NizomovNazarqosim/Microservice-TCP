import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTHENTICATION',
        transport: Transport.TCP,
        options: {
          host:'localhost',
          port: 3001
        }
      },
      {
        name: 'POST',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
