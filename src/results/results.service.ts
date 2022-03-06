import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Results } from './entity/results.entity';
import { Repository } from 'typeorm';
import { Gifts } from '../gifts/entity/gifts.entity';
import { Items } from '../items/entity/items.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Results)
    private resultsRepository: Repository<Results>,
    @InjectRepository(Gifts)
    private giftsRepository: Repository<Gifts>,
    @InjectRepository(Items)
    private itemsRepository: Repository<Items>,
  ) {}

  async createResult(body) {
    // 1. retryCount가 0 이상인지 체크하고
    const gift = await this.giftsRepository.findOne({
      where: {
        id: body.id,
      },
    });
    if (!gift.retryCount) {
      throw new HttpException(
        '재도전 가능한 횟수가 없어요',
        HttpStatus.FORBIDDEN,
      );
    }
    // 2. itemsRepository에서 랜덤으로 1개 가져와서
    const randomItem = await this.itemsRepository
      .createQueryBuilder('Items')
      .where('Items.price > :minBudget', { minBudget: gift.minimumBudget })
      .andWhere('Items.price < :maxBudget', { maxBudget: gift.maxBudget })
      .orderBy('RAND()')
      .limit(1)
      .getOne();
    if (!randomItem) {
      throw new HttpException(
        '현재 뽑을 수 있는 선물이 없어요',
        HttpStatus.NOT_FOUND,
      );
    }
    // 3. 재도전 횟수 1회차감 + 결과 저장
    await this.giftsRepository.update(
      {
        id: body.id,
      },
      {
        ...gift,
        retryCount: gift.retryCount - 1,
      },
    );
    await this.resultsRepository.save({
      giftId: body.id,
      itemUuid: randomItem.uuid,
    });
  }
}
