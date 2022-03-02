import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { Items } from './entity/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Items])],
  providers: [ItemsService],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
