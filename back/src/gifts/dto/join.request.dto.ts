export enum options {
  gifticon = 'gifticon',
  present = 'present',
  voucher = 'voucher',
}

export class JoinRequestDto {
  public giverName: string;
  public getterName: string;
  public minimumBudget: number;
  public maxBudget: number;
  public option: options[]; // 'gifticon' | 'present' | 'voucher'
  public retryCount: number;
  // public password: string;
}
