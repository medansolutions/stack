import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { AuthUser, AuthUserDocument } from '../models/auth-user.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SerializeDocument } from '@stack/utils/mongo-serialize-doc';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('user') private readonly userModel: Model<AuthUserDocument>
  ) {
  }

  async login(user: AuthUser) {
    const payload = { sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  @SerializeDocument(AuthUser)
  async validateUser(username: string, password: string): Promise<AuthUser | null> {
    const user = await this.getAuthUser({ username });

    if (!user) {
      throw new BadRequestException({
        code: 'user_not_found'
      });
    }

    const passwordValid = bcrypt.compare(
      password,
      user.password
    );

    if (!passwordValid) {
      return null;
    }

    return user;
  }

  @SerializeDocument(AuthUser)
  async getAuthUser(query: object): Promise<AuthUser> {
    return this.userModel.findOne(query);
  }
}
