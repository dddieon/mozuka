import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';

@Module({
  providers: [GiftsService],
  controllers: [GiftsController]
})
export class GiftsModule {}
