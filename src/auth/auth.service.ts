import { HttpStatus, Injectable } from '@nestjs/common';
import { UserDTO } from './dto/user.dto';
import { IUser } from 'src/common/interfaces/user.interfaces';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/models/models';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(USER.name) private readonly model: Model<IUser>,
    private readonly jwtService: JwtService,
  ) { }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async create(userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password);
    const newUser = new this.model({ ...userDTO, password: hash });
    return await newUser.save();
  }

  async findAll(): Promise<IUser[]> {
    return await this.model.find()
  }

  async findOne(id: string): Promise<IUser> {
    return await this.model.findById(id)
  }

  async update(id: string, userDTO: UserDTO): Promise<IUser> {
    const hash = await this.hashPassword(userDTO.password)
    const user = { ...userDTO, password: hash }
    return await this.model.findByIdAndUpdate(id, user, { new: true })
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id)
    return { status: HttpStatus.OK, msg: 'Delete User' }
  }

  async findByUsername(username: string) {
    return await this.model.findOne({ username })
  }

  async checkPassword(password: string, passwordDB: string): Promise<boolean> {
    return await bcrypt.compare(password, passwordDB)
  }


  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findByUsername(username)
    const isValidPassword = await this.checkPassword(password, user.password)

    if (user && isValidPassword) return user

    return null
  }

  async signIn(user: any) {
    const payload = {
      username: user.username,
      sub: user._id,
    }
    return { access_token: this.jwtService.sign(payload) }
  }

}
