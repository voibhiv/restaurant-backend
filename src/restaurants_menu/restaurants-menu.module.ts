import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsMenuController } from './restaurants-menu.controller';
import { RestaurantsMenuService } from './restaurants-menu.service';
import { Module } from '@nestjs/common';
import { RestaurantsMenuEntity } from './entities/restaurants-menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantsMenuEntity])],
  controllers: [RestaurantsMenuController],
  providers: [RestaurantsMenuService],
})
export class RestaurantsMenuModule {}
