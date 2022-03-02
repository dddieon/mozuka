import { Injectable } from '@nestjs/common';
import { ItemRequestDto } from '../gifts/dto/item.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Items } from '../gifts/entity/items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private itemsRepository: Repository<Items>,
  ) {}

  async createItems(data: ItemRequestDto) {
    const newItem = {
      imageUrl: data.imageUrl,
      name: data.name,
      price: Number(data.price),
    };
    await this.itemsRepository.save(newItem);
    return newItem;
  }
}
