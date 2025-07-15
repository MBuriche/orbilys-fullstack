import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class @Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthGuard],
})
export class AppModule {}
