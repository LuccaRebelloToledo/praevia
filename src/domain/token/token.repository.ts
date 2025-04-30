import { Token } from './token.entity';

export interface ITokenRepository {
  create(tokenData: Partial<Token>): Promise<Token>;
}
