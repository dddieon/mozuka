import { PickType } from '@nestjs/swagger';
import { Gifts } from '../entity/gifts.entity';

export enum options {
  item = 'item',
  voucher = 'voucher',
  cash = 'cash',
}

export class GiftRequestDto extends PickType(Gifts, [
  'giverName',
  'getterName',
  'minimumBudget',
  'maxBudget',
  'retryCount',
  'password',
] as const) {}
