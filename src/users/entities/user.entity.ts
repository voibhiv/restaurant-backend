import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'name',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'username',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  username: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    length: 255,
    select: false,
  })
  password: string;

  @Column({
    name: 'email',
    nullable: false,
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Column({
    name: 'aboutMe',
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  aboutMe: string;

  @Column({
    name: 'gender',
    nullable: false,
    type: 'varchar',
    length: 1,
  })
  gender: string;

  @Column({
    nullable: false,
    type: 'date',
  })
  birthday: string;

  @Column({
    nullable: true,
    type: 'varchar',
  })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    nullable: true,
  })
  deletedAt: Date;
}
