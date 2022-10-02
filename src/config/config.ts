import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export default {
  // app config
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,


  // db options
  db_host: process.env.DB_HOST || 'localhost',
  db_port: process.env.DB_PORT || 5432,
  db_user: process.env.DB_USER || 'postgres',
  db_pass: process.env.DB_PASS || 'secret',
  db_name: process.env.DB_NAME || 'bootcamp_db',
  db_connection_limit: process.env.DB_CONNECTION_LIMIT || 12,
  orm_migration_dir: process.env.ORM_ENTITIES_DIR || 'migrations',
  orm_entities_dir: process.env.ORM_MIGRATION_DIR || 'entities',
};