import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { GiftsService } from './gifts.service';

@Controller('api/gifts')
export class GiftsController {
  constructor(private giftsService: GiftsService) {}

  @Get('/:id')
  getGift(@Param('id') giftId: string) {
    return this.giftsService.getGift(giftId);
  }

  @Post('/:id/:option')
  async createResult(@Param('id') optionData: string) {
    return this.giftsService.createResult(optionData);
  }

  @Post()
  async createGifts(@Body() giftData: JoinRequestDto) {
    await this.giftsService.createGifts(giftData);
    return;
  }
}
