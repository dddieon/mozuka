import { ApiProperty, PickType } from '@nestjs/swagger';
import { Items } from '../entity/items.entity';

export class giftDto extends PickType(Items, [
  'imageUrl',
  'name',
  'price',
  'url',
] as const) {}

export class ItemRequestDto {
  @ApiProperty()
  imageUrl?: giftDto['imageUrl'];

  @ApiProperty()
  name?: giftDto['name'];

  @ApiProperty()
  price?: giftDto['price'];

  @ApiProperty()
  url?: giftDto['url'];

  @ApiProperty()
  gifts?: Array<giftDto>;

  @ApiProperty()
  option?: string;
}
