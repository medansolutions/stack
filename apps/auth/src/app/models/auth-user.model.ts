import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { randomUUID } from 'crypto';

export type AuthUserDocument = AuthUser & Document;

@Schema({
  timestamps: true
})
export class AuthUser {
  @Prop({
    type: String,
    default: () => randomUUID()
  })
  id: string;

  @Prop({
    required: true,
    unique: true
  })
  username: string;

  @Prop({
    required: true
  })
  @Exclude()
  password: string;

  constructor(partial: Partial<AuthUser>) {
    Object.assign(this, partial);
  }
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
