import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Gifts } from '../../gifts/entity/gifts.entity';
import { Items } from '../../items/entity/items.entity';

@Entity()
export class Results {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Gifts, (gifts) => gifts.id)
  @JoinColumn({ name: 'giftId' })
  giftId: string;

  @ManyToOne(() => Items, (items) => items.uuid, { nullable: true })
  @JoinColumn({ name: 'itemUuid' })
  itemUuid: string;

  @Column()
  price: number;

  @Column()
  option: string;

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
