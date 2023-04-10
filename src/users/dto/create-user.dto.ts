import { IsDate, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  id?: string;

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Username não pode ser vazio' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  @IsString()
  @MinLength(6, { message: 'Senha deve ter no minimo 6 caracteres' })
  password: string;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  aboutMe: string;

  @IsNotEmpty({ message: 'Gênero não pode ser vazio' })
  @IsString()
  gender: string;

  @IsNotEmpty({ message: 'Data de nascimento não pode ser vazia' })
  @IsString()
  birthday: string;

  @IsOptional()
  @IsString()
  phone: string;
}
