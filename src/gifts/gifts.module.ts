import { Module } from '@nestjs/common';
import { GiftsService } from './gifts.service';
import { GiftsController } from './gifts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gifts } from './entity/gifts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gifts])],
  providers: [GiftsService],
  controllers: [GiftsController],
  exports: [GiftsService],
})
export class GiftsModule {}
