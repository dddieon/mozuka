import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
