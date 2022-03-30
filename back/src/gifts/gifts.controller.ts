import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { GiftRequestDto } from './dto/gift.request.dto';
import { GiftsService } from './gifts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/gifts')
export class GiftsController {
  constructor(private giftsService: GiftsService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req) {
    return req.user; // req.user에는 return한 gift 객체가 담겨온다
  }

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
