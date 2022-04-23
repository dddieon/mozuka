import { Injectable } from '@nestjs/common';
import { ItemRequestDto } from './dto/item.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Items } from './entity/items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private itemsRepository: Repository<Items>,
  ) {}

  async createAllItems(data: ItemRequestDto) {
    const { gifts } = data;
    const giftUrls = gifts.map((i) => i.url);
    const existedItems = await this.itemsRepository
      .createQueryBuilder('Items')
      .where('Items.url IN (:...ids)', {
        ids: giftUrls,
      })
      .select('Items.url')
      .getMany();

    const existedIds = existedItems.map((i) => i.url);

    const filteredGifts = gifts.filter((i) => {
      if (!existedIds.includes(i.url)) return true;
    });

    await this.itemsRepository.save(filteredGifts);
    return {
      count: filteredGifts.length,
      gifts: filteredGifts,
    };
  }

  async createItems(data: ItemRequestDto) {
    const newItem = {
      imageUrl: data.imageUrl,
      name: data.name,
      price: Number(data.price),
      url: data.url,
    };
    await this.itemsRepository.save(newItem);
    return newItem;
  }
}
