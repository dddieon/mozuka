import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Results } from '../../results/entity/results.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  imageUrl: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @OneToMany(() => Results, (result) => result.id, { nullable: true })
  results: Results[];
}
