import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async logout(userId: number) {
    return { message: 'Logged out successfully' };
  }
}
