import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
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
}
