import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Gifts } from '../gifts/entity/gifts.entity';
import { Items } from '../items/entity/items.entity';
import { Results } from './entity/results.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Results, Gifts, Items])],
  providers: [ResultsService],
  controllers: [ResultsController],
  exports: [ResultsService],
})
export class ResultsModule {}
