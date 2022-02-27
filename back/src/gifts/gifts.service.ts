import { Injectable } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';

@Injectable()
export class GiftsService {
  postGifts({
    giverName,
    getterName,
    minimumBudget,
    maxBudget,
    option,
    retryCount,
  }: JoinRequestDto) {}
}
