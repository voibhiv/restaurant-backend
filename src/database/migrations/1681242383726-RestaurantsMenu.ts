import { RestaurantsEntity } from '@/restaurants/entities/restaurants.entity';
import { RestaurantsMenuEntity } from '@/restaurants_menu/entities/restaurants-menu.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RestaurantsMenu1681242383726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Define repositories and getting id's
    const restaurantsRepository = queryRunner.manager.getRepository(RestaurantsEntity);
    const restaurantsMenuRepository = queryRunner.manager.getRepository(RestaurantsMenuEntity);
    const allRestaurants = await restaurantsRepository.find();
    const restaurantsIds = await allRestaurants.map((restaurant) => {
      return restaurant;
    });

    // Put some images for each type of food
    const foodImagesArray = new Map([
      [
        'Pizza',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Hamburguer',
        'https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Sushi',
        'https://images.unsplash.com/photo-1611143669185-af224c5e3252?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
      ],
      [
        'Tacos',
        'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Lasanha',
        'https://images.unsplash.com/photo-1621510456681-2330135e5871?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Camarão',
        'https://images.unsplash.com/photo-1594397107804-22dfcdef5a06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Macarrão',
        'https://images.unsplash.com/photo-1549592406-bf2a4270a071?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Churrasco',
        'https://images.unsplash.com/photo-1594397108691-61fe6098c247?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Frango',
        'https://images.unsplash.com/photo-1562967915-92ae0c320a01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80',
      ],
      [
        'Bolo de chocolate',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80',
      ],
      [
        'Sorvete',
        'https://images.unsplash.com/photo-1484876586759-80555b97b22d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
      [
        'Cafe',
        'https://plus.unsplash.com/premium_photo-1675362191731-0b7947b5f1b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
      ],
      [
        'Cha',
        'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80',
      ],
      [
        'Suco',
        'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80',
      ],
    ]);

    // Generate random items and images
    const itemsMenu: Partial<RestaurantsMenuEntity>[] = [];
    const typeOfFood = [
      'Hamburguer',
      'Pizza',
      'Sushi',
      'Tacos',
      'Lasanha',
      'Camarão',
      'Macarrão',
      'Churrasco',
      'Frango',
      'Bolo de chocolate',
      'Sorvete',
      'Cafe',
      'Cha',
      'Suco',
    ];
    for (let i = 1; i <= 15; i++) {
      const randomIndex = Math.floor(Math.random() * restaurantsIds.length);
      const itemSelected = typeOfFood[Math.floor(Math.random() * typeOfFood.length)];
      const drinks = ['Cafe', 'Cha', 'Suco'];
      const item = {
        name: `${itemSelected}`,
        description: `Descrição genérica do ${itemSelected}`,
        image: `${foodImagesArray.get(itemSelected)}`,
        price: `${Math.floor(Math.random() * 100) + 1}`,
        type: (drinks.includes(`${itemSelected}`) ? 1 : 0).toString(),
        restaurant: restaurantsIds[randomIndex],
      };
      itemsMenu.push(item);
    }
    await restaurantsMenuRepository.save(itemsMenu);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //
  }
}
