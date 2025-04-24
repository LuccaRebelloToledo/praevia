import { Injectable } from '@nestjs/common';

import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(plain: string): Promise<string> {
    const salt = await genSalt();
    return await hash(plain, salt);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return await compare(plain, hashed);
  }
}
