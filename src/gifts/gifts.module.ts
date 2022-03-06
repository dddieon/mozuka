import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gifts } from './entity/gifts.entity';
import { Results } from '../results/entity/results.entity';
import { Items } from '../items/entity/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gifts, Results, Items])],
  providers: [GiftsService],
  controllers: [GiftsController],
  exports: [GiftsService],
})
export class GiftsModule {}
