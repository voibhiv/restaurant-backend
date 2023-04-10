import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  id?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Senha deve ter no minimo 6 caracteres' })
  password: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  aboutMe: string;

  @IsOptional()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  birthday: string;

  @IsOptional()
  @IsString()
  phone: string;
}
