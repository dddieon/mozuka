import { PickType } from '@nestjs/swagger';
import { Gifts } from '../entity/gifts.entity';

export enum options {
  gifticon = 'gifticon',
  present = 'present',
  voucher = 'voucher',
}

export class JoinRequestDto extends PickType(Gifts, [
  'giverName',
  'getterName',
  'minimumBudget',
  'maxBudget',
  'retryCount',
  'password',
] as const) {}
