import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compareSync } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(req: CreateUserDto): Promise<Partial<User>> {
    // Check if username already exists in database
    const userByUsername: User | null = await this.usersRepository.findOneBy({
      username: req.username,
    });
    if (userByUsername) throw new ConflictException('Username já existente, por favor tente outro');

    // Check if email already exists in database
    const userByEmail: User | null = await this.usersRepository.findOneBy({
      email: req.email,
    });
    if (userByEmail) throw new ConflictException('Email já existente, por favor tente outro');

    // Check if email already exists in database
    const userByPhone: User | null = await this.usersRepository.findOneBy({
      phone: req.phone,
    });
    if (userByPhone) throw new ConflictException('Telefone já existente, por favor tente outro');

    // encrypt password
    req.password = await this.hashPassword(req.password);

    // Throw a Errow if fail operation
    const newUser: User = await this.usersRepository.save(req);
    if (!newUser)
      throw new NotFoundException('Erro na criação do usuário, tente novamente mais tarde');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser;

    return rest;
  }

  public async getMe(id: string): Promise<User | null> {
    // Check if id exists
    if (!id) throw new BadRequestException('Id não especificado');

    // Find user and check if was found
    const user = this.usersRepository.findOneBy({
      id,
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    return user;
  }

  public async getByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username: username },
      select: ['id', 'username', 'password', 'email'],
    });
  }

  public async updateUser(id: string, req: UpdateUserDto): Promise<Partial<User>> {
    // Put id at the object to typeorm understand that is a update
    req.id = id;

    // Check if username already exists in database
    if (req.username) {
      const userByUsername: User | null = await this.usersRepository.findOneBy({
        username: req.username,
      });
      if (userByUsername)
        throw new ConflictException('Username já existente, por favor tente outro');
    }

    // Check if email already exists in database
    if (req.email) {
      const userByEmail: User | null = await this.usersRepository.findOneBy({
        email: req.email,
      });
      if (userByEmail) throw new ConflictException('Email já existente, por favor tente outro');
    }

    // Check if email already exists in database
    if (req.phone) {
      const userByPhone: User | null = await this.usersRepository.findOneBy({
        phone: req.phone,
      });
      if (userByPhone) throw new ConflictException('Telefone já existente, por favor tente outro');
    }

    // Check if password is equal to actual
    if (req.password) {
      const userByPassword = await await this.usersRepository.findOne({
        where: { id: id },
        select: ['password'],
      });
      if (userByPassword && (await compareSync(req.password, userByPassword.password))) {
        throw new ConflictException('A senha deve ser diferente da atual!');
      }
    }

    // hash password
    req.password = await this.hashPassword(`${req.password}`);

    // Throw a Errow if fail operation
    const updatedUser = await this.usersRepository.save(req);
    if (!updatedUser) {
      throw new NotFoundException('Erro na atualização do usuário, tente novamente mais tarde');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = updatedUser;

    return rest;
  }

  public async deleteUser(id: string) {
    const userDeleted = await this.usersRepository.softDelete(id);
    const isDeleted = !!userDeleted.affected || false;

    if (!isDeleted) {
      throw new NotFoundException('Erro ao tentar excluir usuário');
    }

    return isDeleted;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const result = await hash(password, saltRounds);

    return `${result}`;
  }
}
