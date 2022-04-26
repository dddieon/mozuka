import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Gifts } from './gifts/entity/gifts.entity';
import { Items } from './items/entity/items.entity';
import dotenv from 'dotenv'; // todo local server

if (process.env.NODE_ENV !== 'production') dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Gifts, Items],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
  keepConnectionAlive: true,
};

export = config;
