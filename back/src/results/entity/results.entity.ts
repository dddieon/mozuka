import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gifts } from '../../gifts/entity/gifts.entity';
import { Items } from '../../items/entity/items.entity';

@Entity()
export class Results {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Gifts, (gifts) => gifts.id, { nullable: false })
  @JoinColumn({ name: 'giftId' })
  giftId: string;

  @ManyToOne(() => Items, (items) => items.uuid, { nullable: false })
  @JoinColumn({ name: 'itemUuid' })
  itemUuid: string;
}
