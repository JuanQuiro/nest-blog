import { Controller, Post, Body, Get, Param, Put, Delete, Req, UseGuards } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuards } from './guards/jwt-auth.guards';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/create')
  create(@Body() userDTO: UserDTO) {
    return this.authService.create(userDTO);
  }

  @Get('/getAll')
  findAll() {
    return this.authService.findAll();
  }

  @Get('/getId/:id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Put('/update/:id')
  update(@Param('id') id: string, @Body() userDTO: UserDTO) {
    return this.authService.update(id, userDTO);
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string) {
    return this.authService.delete(id);
  }

  @UseGuards(LocalAuthGuards)
  @Post('/signin')
  async signIn(@Req() req) {
    return this.authService.signIn(req.user);
  }

  @Post('/signup')
  async signUp(@Body() userDTO: UserDTO) {
    return this.authService.create(userDTO);
  }




}
