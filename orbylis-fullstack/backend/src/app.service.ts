import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Orbylis API rodando com sucesso!';
  }
}
