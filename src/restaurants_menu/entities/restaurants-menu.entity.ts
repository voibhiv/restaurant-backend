import { RestaurantsEntity } from '@/restaurants/entities/restaurants.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurantsMenu')
export class RestaurantsMenuEntity {
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
    name: 'description',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  description: string;

  @Column({
    name: 'image',
    nullable: false,
    type: 'varchar',
    length: 2200,
  })
  image: string;

  @Column({
    type: 'real',
  })
  price: string;

  @Column({
    type: 'real',
  })
  type: string;

  @ManyToOne(() => RestaurantsEntity, (restaurant) => restaurant.menus)
  restaurant: RestaurantsEntity;
}
