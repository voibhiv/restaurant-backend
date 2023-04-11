import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsService } from './restaurants.service';
import { Module } from '@nestjs/common';
import { RestaurantsEntity } from './entities/restaurants.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantsEntity])],
  controllers: [],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
