import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Gifts } from './gifts/entity/gifts.entity';

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'mozuka-db.cukfkjyuwoff.ap-northeast-2.rds.amazonaws.com',
  port: 3306,
  username: 'root',
  password: '123123123',
  database: 'mozuka',
  entities: [Gifts],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true,
  logging: true,
  keepConnectionAlive: true,
};

export = config;
