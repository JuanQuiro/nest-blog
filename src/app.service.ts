import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hola nestjs, ve para /docs para ver la documentacion';
  }
}
