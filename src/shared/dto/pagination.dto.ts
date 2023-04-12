import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  skip: number;
}

export class PaginationRespDto {
  @IsOptional()
  @IsNumber()
  take?: number;

  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  total?: number;

  @IsNotEmpty()
  data: any[];
}
