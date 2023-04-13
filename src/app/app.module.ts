import { RestaurantsMenuModule } from './../restaurants_menu/restaurants-menu.module';
import { RestaurantsModule } from './../restaurants/restaurants.module';
import { AuthModule } from './../auth/auth.module';
import { UsersModule } from './../users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ResponseFormatMiddleware } from '@/middlewares/response-format.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      name: 'default',
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      synchronize: false,
      migrationsRun: false,
      autoLoadEntities: true,
      keepConnectionAlive: true,
      logging: false,
      entities: ['dist/entities/**/*.{ts,js}'],
      migrations: ['dist/database/migrations/**/*.{ts,js}'],
    }),
    UsersModule,
    AuthModule,
    RestaurantsModule,
    RestaurantsMenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).exclude('/auth/login', '/users/create').forRoutes('*');
    consumer.apply(ResponseFormatMiddleware).exclude('/auth/login').forRoutes('*');
  }
}
