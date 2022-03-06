import { Injectable, NotFoundException } from '@nestjs/common';
import { GiftRequestDto } from './dto/gift.request.dto';
import { Gifts } from './entity/gifts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { Results } from '../results/entity/results.entity';
import { Items } from '../items/entity/items.entity';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gifts)
    private giftsRepository: Repository<Gifts>, // @InjectRepository(Items) // private itemsRepository: Repository<Items>,
    @InjectRepository(Results)
    private resultsRepository: Repository<Results>,
    @InjectRepository(Items)
    private itemsRepository: Repository<Items>,
  ) {}

  async getGift(id: string) {
    const gift = await this.giftsRepository.findOne({
      where: {
        id,
      },
    });

    const results = await this.resultsRepository
      .createQueryBuilder('Results')
      .leftJoinAndSelect('Results.giftId', 'giftId')
      .leftJoinAndSelect('Results.itemUuid', 'itemUuid')
      .where('Results.giftId = :id', { id })
      .getMany();

    const resultItemIds = results.map((result) => {
      return result['itemUuid']['uuid'];
    });

    const result = await this.itemsRepository
      .createQueryBuilder('Items')
      .where('Items.uuid IN (:...ids)', {
        ids: resultItemIds,
      })
      .getMany();

    if (!gift) {
      throw new NotFoundException(`gift id ${id} not found`);
    }
    return { ...gift, result };
  }

  async createGifts(giftData: GiftRequestDto) {
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
