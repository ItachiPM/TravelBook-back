import { config } from '../../config/config';

const { host, port, username, password, database } = config.db;

export const PostgreDataSource = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: ['dist/**/**.entity{.ts,.js}'],
  synchronize: true,
};
