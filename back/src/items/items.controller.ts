import { Body, Controller, Post } from '@nestjs/common';
import { ItemRequestDto } from './dto/item.request.dto';
import { ItemsService } from './items.service';

@Controller('api/items')
export class ItemsController {
  constructor(private itemsService: ItemsService) {}

  @Post()
  async createItems(@Body() itemData: ItemRequestDto) {
    return await this.itemsService.createItems(itemData);
  }
}
