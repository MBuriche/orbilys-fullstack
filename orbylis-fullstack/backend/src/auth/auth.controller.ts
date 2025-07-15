import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { username: string, password: string }) {
    return this.authService.login(body.username, body.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return { user: req['user'] };
  }
}
