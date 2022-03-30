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
    //todo null로 변경
    return null;
  }

  async login(data: { username: string; password: string }) {
    const payload = { username: data.username }; // json web token 으로 변환할 데이터 정보
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
