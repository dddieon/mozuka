import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Results } from '../../results/entity/results.entity';

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

  @Column()
  option: 'delivery' | 'voucher' | 'cash';

  @Column()
  retryCount: number;

  @Column()
  password: string;

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
