import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { root } from './paths';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'database-pwd',
  database: 'nestjs',
  logging: true,
  autoLoadEntities: true,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
  },
};