import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Gifts } from '../entity/gifts.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Gifts)
    private giftsRepository: Repository<Gifts>,
    private jwtService: JwtService,
  ) {}

  async validateGifts(id: string, password: string): Promise<any> {
    const gift = await this.giftsRepository.findOne({
      where: {
        id,
      },
    });
    if (gift && gift.password === password) {
      const { password, ...result } = gift; // 객체에서 filter 거는 방법
      return result;
    }
    return null;
  }

  async getCookieWithJwtToken(data: { username: string; password: string }) {
    const payload = { username: data.username, sub: data.username }; // <참고 1> 서명할 때 작성한 내용은 jwt 검증할 때 해독된다
    const token = this.jwtService.sign(payload);
    return {
      token,
      cookie: `Authentication=${token}; Path=/; Max-Age=1d`,
    };
  }
}
