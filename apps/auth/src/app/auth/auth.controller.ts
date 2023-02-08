import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from '@stack/auth/guards';
import { RequestUser } from '../util/request-user.decorator';
import { AuthUser, JwtUser } from '../models/auth-user.model';
import { LoginDTO } from '../dto/login.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @RequestUser() user: AuthUser,
    @Body() req: LoginDTO
  ) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async profile(
    @RequestUser() user: JwtUser
  ) {
    return this.authService.getUser({
      id: user.id
    })
  }
}
