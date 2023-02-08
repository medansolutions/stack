import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminUserSeed implements OnModuleInit {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {
  }

  async onModuleInit(): Promise<void> {
    const username = this.configService.getOrThrow<string>('ADMIN_USERNAME');
    let user = await this.authService.getAuthUser({username});

    if (user) {
      return;
    }

    const envPassword = this.configService.getOrThrow<string>('ADMIN_PASSWORD');
    const saltOrRounds = 10;
    const password = await bcrypt.hash(envPassword, saltOrRounds);

    user = await this.authService.createUser({
      username,
      password
    });

    console.log(user);
  }
}
