import { PickType } from '@nestjs/swagger';
import { Items } from '../entity/items.entity';

export class ItemRequestDto extends PickType(Items, [
  'imageUrl',
  'name',
  'price',
] as const) {}
