import { ConfigEnv } from './core/config';

const env: { [k: string]: ConfigEnv } = {
  development: {
    name: 'profiles-service',
    port: 3000,
    mongo: {
      database: 'profiles',
      user: 'root',
      password: 'secret',
      host: 'profiles-mongodb',
      port: '27019',
      uri: 'mongodb://root:secret@profiles-mongodb:27019/profiles?authSource=admin',
    },
  },
};
env.production = {
  ...env.development,
  port: 3000,
};
export const config: { [k: string]: ConfigEnv } = env;
