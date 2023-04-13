import { RestaurantsMenuEntity } from '@/restaurants_menu/entities/restaurants-menu.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurants')
export class RestaurantsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    type: 'real',
  })
  stars: string;

  @Column({
    name: 'description',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    name: 'timeToDelivery',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  timeToDelivery: string;

  @Column({
    type: 'real',
  })
  priceToDelivery: string;

  @Column({
    name: 'image',
    nullable: false,
    type: 'varchar',
    length: 2200,
  })
  image: string;

  @Column({
    name: 'icon',
    nullable: false,
    type: 'varchar',
    length: 2200,
  })
  icon: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  phone: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  address: string;

  @Column({
    type: 'real',
  })
  averagePrice: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date;

  @OneToMany(() => RestaurantsMenuEntity, (menu) => menu.restaurant, { eager: true })
  menus: RestaurantsMenuEntity[];
}
