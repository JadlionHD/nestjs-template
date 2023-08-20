import {
  Controller,
  Get,
  Render,
  Request,
  Response,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Request as IRequest, Response as IResponse } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('home')
  @Render('home.ejs')
  root() {
    return { msg: 'hello mantap!' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req: IRequest,
    @Response({ passthrough: true }) res: IResponse,
  ): Promise<void> {
    const { access_token } = await this.authService.login(req.user);
    res
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
      })
      .send({ status: 'ok' });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @Render('profile.ejs')
  renderProfile(@Request() req) {
    return { user: req.user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('testauth')
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
