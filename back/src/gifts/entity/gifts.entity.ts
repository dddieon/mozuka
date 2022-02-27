import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gifts {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  giverName: string;

  @Column()
  getterName: string;

  @Column()
  minimumBudget: number;

  @Column()
  maxBudget: number;

  // @Column()
  // option: options[]; // 'gifticon' | 'present' | 'voucher'

  @Column()
  retryCount: number;

  @Column()
  password: string;
}
