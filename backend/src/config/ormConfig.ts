import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from './config';

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: config.db_host,
  port: Number(config.db_port),
  database: config.db_name,
  username: config.db_user,
  password: config.db_pass,
  migrations: [join(__dirname, '..', config.orm_migration_dir, '*.{ts,js}')],
  entities: [join(__dirname, '..', config.orm_entities_dir, '**', '*.{ts,js}')],
  synchronize: false,
};
