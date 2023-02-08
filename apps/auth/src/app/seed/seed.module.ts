import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserSchema } from '../models/auth-user.model';
import { ConfigModule } from '@nestjs/config';
import { AdminUserSeed } from './admin.seed';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    MongooseModule.forFeature([{
      name: 'user', schema: AuthUserSchema
    }])
  ],
  providers: [
    AdminUserSeed
  ]
})
export class AuthSeedModule {
}
