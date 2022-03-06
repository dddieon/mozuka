import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  // @Column()
  // option: options[]; // 'gifticon' | 'present' | 'cash'

  @Column()
  retryCount: number;

  @Column()
  password: string;

  @OneToMany(() => Results, (result) => result.id, { nullable: true })
  results: Results[];
}
