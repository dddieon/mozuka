import { Body, Controller, Post } from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('api/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  async createItems(@Body() itemData) {
    if (itemData.option === 'all') {
      return await this.itemsService.createAllItems(itemData);
    }
    return await this.itemsService.createItems(itemData);
  }
}
