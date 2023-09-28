import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from 'src/common/models/models';
import { UserSchema } from './schema/auth.schema';

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: USER.name,
    useFactory: () => {
      return UserSchema
    }
  },]),],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
