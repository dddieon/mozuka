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
