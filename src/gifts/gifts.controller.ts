import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GiftRequestDto } from './dto/gift.request.dto';
import { GiftsService } from './gifts.service';

@Controller('api/gifts')
export class GiftsController {
  constructor(private giftsService: GiftsService) {}

  @Get('/:id')
  getGift(@Param('id') giftId: string) {
    return this.giftsService.getGift(giftId);
  }

  // @Post('/:id')
  // async createResult(@Param('id') id: string, @Body() body) {
  //   return this.giftsService.createResult(id, body);
  // }

  @Post()
  async createGifts(@Body() giftData: GiftRequestDto) {
    return await this.giftsService.createGifts(giftData);
  }
}
