import { Injectable, NotFoundException } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { Gifts } from './entity/gifts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gifts)
    private giftsRepository: Repository<Gifts>, // @InjectRepository(Items) // private itemsRepository: Repository<Items>,
  ) {}

  async getGift(id: string) {
    const user = await this.giftsRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`user id ${id} not found`);
    }
    return user;
  }

  async createResult(optionData) {
    // 1. get Items
    // 2. random choice
    // 3. create result
  }

  async createGifts(giftData: JoinRequestDto) {
    const uuid = uuidV4();
    console.log(`${uuid} is creating...`);
    const newGift = {
      giverName: giftData.giverName,
      getterName: giftData.getterName,
      minimumBudget: Number(giftData.minimumBudget),
      maxBudget: Number(giftData.maxBudget),
      // options: giftData.getterName.join(','),
      retryCount: Number(giftData.retryCount),
      password: giftData.password,
    };
    await this.giftsRepository.save(newGift);
    return newGift;
  }
}
