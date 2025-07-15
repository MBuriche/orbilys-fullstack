import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly JWT_SECRET = 'orbylis-secret'; // Pode colocar em env depois

  login(username: string, password: string) {
    // Simulação: aceita qualquer usuário/senha igual a "admin"
    if (username === 'admin' && password === 'admin') {
      const payload = { username };
      const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
      return { token };
    }
    throw new UnauthorizedException('Credenciais inválidas');
  }

  validateToken(token: string) {
    try {
      return jwt.verify(token, this.JWT_SECRET);
    } catch {
      return null;
    }
  }
}
