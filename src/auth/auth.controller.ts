import { Controller, Post, Body } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { }

  @Post()
  create(@Body() userDTO: UserDTO) {
    return this.authService.create(userDTO);
  }
}
