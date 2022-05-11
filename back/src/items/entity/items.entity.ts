import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Results } from '../../results/entity/results.entity';

export const itemOptions = ['delivery', 'voucher'] as const;

@Entity()
@Unique(['url'])
export class Items {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  url: string;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  option: 'delivery' | 'voucher';

  @OneToMany(() => Results, (result) => result.id, { nullable: true })
  results: Results[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
