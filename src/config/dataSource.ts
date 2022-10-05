import { DataSource, DataSourceOptions } from 'typeorm';
import { ormConfig } from './ormconfig';

const AppDataSource = new DataSource({
  type: ormConfig.type,
  host: ormConfig.host,
  port: ormConfig.port,
  username: ormConfig.username,
  password: ormConfig.password,
  migrations: ormConfig.migrations,
  entities: ormConfig.entities,
  database: ormConfig.database,
  synchronize: false,
  migrationsRun: true,
} as unknown as DataSourceOptions);

export default AppDataSource;