"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor() {
        this.JWT_SECRET = 'orbylis-secret'; // Pode colocar em env depois
    }
    login(username, password) {
        // Simulação: aceita qualquer usuário/senha igual a "admin"
        if (username === 'admin' && password === 'admin') {
            const payload = { username };
            const token = jwt.sign(payload, this.JWT_SECRET, { expiresIn: '1h' });
            return { token };
        }
        throw new common_1.UnauthorizedException('Credenciais inválidas');
    }
    validateToken(token) {
        try {
            return jwt.verify(token, this.JWT_SECRET);
        }
        catch (_a) {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map