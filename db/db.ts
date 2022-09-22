import { config } from 'config/config';

const { host, password, port, username, database } = config.db;

export const postgreDataSource = {
  type: 'postgres',
  host: host,
  port: port,
  username: username,
  password: password,
  database: database,
  entities: ['dist/**/**.entity{.ts,.js}'],
  synchronize: true,
};
