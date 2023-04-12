import { RestaurantsEntity } from '@/restaurants/entities/restaurants.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

const restaurantsSeed: Partial<RestaurantsEntity>[] = [
  {
    name: 'The Steakhouse',
    description:
      'Um restaurante de carne sofisticado que serve alguns dos melhores cortes de carne da cidade.',
    timeToDelivery: '30-45 minutos',
    stars: '4.7',
    priceToDelivery: '10',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/26/de/a2/1c/the-steakhouse-disney.jpg',
    icon: 'https://img.freepik.com/premium-vector/steak-house-restaurant-vector-logo-icon-template_22692-384.jpg?w=2000',
    averagePrice: '3',
    phone: '(34) 94002-8922',
    address: 'Av.Santos Dumont',
  },
  {
    name: 'Taco Heaven',
    description:
      'Um restaurante mexicano que oferece deliciosos tacos, burritos e outros pratos tradicionais.',
    timeToDelivery: '20-30 minutos',
    stars: '4.2',
    priceToDelivery: '5',
    image: 'https://mapadasfranquias.com.br/wp-content/uploads/2021/08/tacoshoploja.jpg',
    icon: 'https://i.pinimg.com/originals/83/3d/cc/833dcc20b57b26223bcd62c581f482c5.jpg',
    averagePrice: '2',
    phone: '(34) 94002-0000',
    address: 'Av.Leopoldino de Oliveira',
  },
  {
    name: 'Pizza Italia',
    description:
      'Um restaurante italiano que serve pizza autêntica, massa e outros pratos italianos.',
    timeToDelivery: '25-35 minutos',
    stars: '4.5',
    priceToDelivery: '7',
    image: 'https://pizzaplacebg.com/wp-content/uploads/2022/03/Photo-18-10-21-18-32-39-scaled.jpg',
    icon: 'https://i.pinimg.com/originals/82/01/79/82017984a238d9fa4eb14abf6f1b8919.jpg',
    averagePrice: '1',
    phone: '(34) 94003-3399',
    address: 'Av.Leopoldino de Oliveira',
  },
];

export class Restaurants1681239046129 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const restaurantsRepository = queryRunner.manager.getRepository(RestaurantsEntity);
    const restaurantsSeeded = restaurantsRepository.create(restaurantsSeed);

    await restaurantsRepository.save(restaurantsSeeded);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
