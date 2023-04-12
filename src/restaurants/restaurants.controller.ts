import { JwtAuthGuard } from '@/auth/shared/jwt-auth.guard';
import { Body, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { PaginationDto } from '@/shared/dto/pagination.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async read(@Query('search') search: string, @Body() req: PaginationDto) {
    try {
      return await this.restaurantsService.getAll(req, search);
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
