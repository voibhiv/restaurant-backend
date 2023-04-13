import { JwtAuthGuard } from '@/auth/shared/jwt-auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async read(
    @Query('search') search: string,
    @Query('take') take: number,
    @Query('skip') skip: number,
  ) {
    try {
      return await this.restaurantsService.getAll({ take, skip }, search);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  public async readOne(@Param('id') id: string) {
    try {
      return await this.restaurantsService.getOne(id);
    } catch (error) {
      return error;
    }
  }
}
