import { Injectable, NotFoundException } from '@nestjs/common';
import { GiftRequestDto } from './dto/gift.request.dto';
import { Gifts } from './entity/gifts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      // .leftJoinAndSelect('Results.giftId', 'gift')
      .leftJoinAndSelect('Results.itemUuid', 'item')
      .where('Results.giftId = :id', { id })
      .getMany();

    // const resultItemIds = results.map((result) => {
    //   if (result['option'] === 'gifticon') return result['itemUuid']['uuid'];
    // });
    //
    // if (resultItemIds.length) {
    //   resultItems = await this.itemsRepository
    //     .createQueryBuilder('Items')
    //     .where('Items.uuid IN (:...ids)', {
    //       ids: resultItemIds,
    //     })
    //     .getMany();
    // }
    if (!gift) {
      throw new NotFoundException(`gift id ${id} not found`);
    }
    return { ...gift, results };
  }

  async createGifts(giftData: GiftRequestDto) {
    const newGift = {
      giverName: giftData.giverName,
      getterName: giftData.getterName,
      minimumBudget: Number(giftData.minimumBudget),
      maxBudget: Number(giftData.maxBudget),
      // options: giftData.getterName.join(','),
      retryCount: Number(giftData.retryCount),
      password: giftData.password,
    };
    const gift = await this.giftsRepository.save(newGift);
    delete gift.password;
    return gift;
  }
}
