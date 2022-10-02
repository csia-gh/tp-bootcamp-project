import { join } from 'path';
import config from './config';

export const ormConfig = {
  type: 'postgres',
  host: config.db_host,
  port: Number(config.db_port),
  username: config.db_user,
  password: config.db_pass,
  database: config.db_name,
  entities: [join(__dirname, '..', config.orm_entities_dir, '**', '*.{ts,js}')],
  migrations: [join(__dirname, '..', config.orm_migration_dir, '*.{ts,js}')],
  multipleStatements: true,
  extra: {
    connectionLimit: config.db_connection_limit,
  },
};
