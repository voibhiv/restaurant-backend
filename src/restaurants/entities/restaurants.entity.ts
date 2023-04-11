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

  @Column()
  starts: number;

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

  @Column()
  priceToDelivery: number;

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

  @Column()
  averagePrice: number;

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

  @OneToMany(() => RestaurantsEntity, (restaurantEntity) => restaurantEntity.restaurantMenu)
  restaurantMenu: RestaurantsEntity[];


}
