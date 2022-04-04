import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { GiftRequestDto } from './dto/gift.request.dto';
import { GiftsService } from './gifts.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller('api/gifts')
export class GiftsController {
  constructor(
    private giftsService: GiftsService,
    private authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/auth/login')
  async login(@Request() req, @Res() res) {
    const { user } = req;
    const cookie = await this.authService.getCookieWithJwtToken(req.user);
    /*
      공식문서에서 변형 (README - 공식문서에 없는 부분 part 참고)
      => 해당 문서와 달리 await 추가하지 않으면 리턴값이 정상적이지 않았음
    */
    res.setHeader('Set-Cookie', cookie + '; SameSite=None; Secure'); // SET COOKIE
    user.password = undefined;
    return res.send(user);
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
