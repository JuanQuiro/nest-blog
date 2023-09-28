import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export enum UserType {
  ADMIN = "admin",
  EDITOR = "editor",
  READER = "reader",
}

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly category: UserType;

}
