import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RestaurantsEntity } from './entities/restaurants.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationDto, PaginationRespDto } from '@/shared/dto/pagination.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantsEntity)
    private restaurantsRepository: Repository<RestaurantsEntity>,
  ) {}

  public async getAll(req: PaginationDto, searchText: string): Promise<PaginationRespDto> {
    // Select items by parameters
    const query: SelectQueryBuilder<RestaurantsEntity> =
      await this.restaurantsRepository.createQueryBuilder('restaurants');
    query.leftJoinAndSelect('restaurants.menus', 'menus');
    query.where(
      'menus.name like :name OR menus.description like :description OR restaurants.name like :name OR restaurants.description like :description',
      {
        name: `%${searchText}%`,
        description: `%${searchText}%`,
      },
    );

    query.skip(req.skip).take(req.take).orderBy('restaurants.stars', 'DESC');

    const [result, total] = await query.getManyAndCount();

    return {
      data: result,
      total: total,
      take: result.length,
    };
  }

  public async getOne(id: string): Promise<RestaurantsEntity | null> {
    if (!id) throw new BadRequestException('Id não especificado');

    const user = await this.restaurantsRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }
}
