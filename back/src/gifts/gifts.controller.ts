import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { GiftsService } from './gifts.service';

@Controller('api/gifts')
export class GiftsController {
  constructor(private giftsService: GiftsService) {}

  @Get(':id')
  getGifts(@Param() param) {
    console.log(param);
    return 'get Gifts';
  }

  @Post()
  postGifts(@Body() data: JoinRequestDto) {
    this.giftsService.postGifts(data);
    return;
  }
}
