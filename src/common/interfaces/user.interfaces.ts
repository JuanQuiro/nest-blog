export enum UserType {
  ADMIN = 'admin',
  EDITOR = 'editor',
  READER = 'reader',
}

export interface IUser extends Document {
  name: string;
  surname: string;
  username: string;
  email: string;
  password: string;
  category: UserType;
}
