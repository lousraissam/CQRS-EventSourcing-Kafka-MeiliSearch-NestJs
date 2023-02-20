import { v4 as uuid } from 'uuid';

export interface Config {
  id: string;
  env: string;
  name: string;
  port: number;
  mongo: MongoConfig;
}

export interface MongoConfig {
  uri: string;
}

export interface MongoEnv {
  database?: string;
  user?: string;
  password?: string;
  host?: string;
  port?: string;
  uri?: string;
  credentials?: {
    uri?: string;
  };
}


export interface ConfigEnv {
  name: string;
  port: number;
  mongo?: MongoEnv;
}

export class ConfigService {
  private readonly config: Config;

  constructor(envs: { [k: string]: ConfigEnv }) {
    if (!envs) {
      throw new Error('No Service Config provided');
    }
    const envKey = process.env.PROD_ENV || 'development';
    const env: ConfigEnv = envs[envKey];
    if (!env) {
      throw new Error(`No Service Config for ${envKey} environment provided`);
    }

    // Mongo
    env.mongo = env.mongo || {};
    const mongo: MongoConfig = {
      uri: process.env.MONGO_URI || 'mongodb://root:secret@profiles-mongodb:27019/profiles?authSource=admin',
    };
    if (env.mongo.credentials && env.mongo.credentials.uri) {
      mongo.uri = env.mongo.credentials.uri || process.env.MONGO_URI || '';
    } else {
      const user = process.env.MONGO_USER || env.mongo.user;
      const password = process.env.MONGO_PASSWORD || env.mongo.password;
      const credentials = user && password ? `${user}:${password}@` : '' || 'root:secret';
      const host = process.env.MONGO_HOST || env.mongo.host || 'profiles-mongodb';
      const port = process.env.MONGO_PORT || env.mongo.port || '27019';
      const database = process.env.MONGO_DB || env.mongo.database || '';
      mongo.uri = process.env.MONGO_URI || env.mongo.uri || `mongodb://${credentials}${host}:${port}/${database}`;
    }


    this.config = {
      id: uuid(),
      name: env.name || '',
      port: +process.env.PORT || env.port || 3000,
      env: process.env.NODE_ENV || 'development',
      mongo,
    };
  }

  public getConfig(): Config {
    return this.config;
  }

  public getEnvironment(): string {
    return this.config.env;
  }

  public getMongo(): MongoConfig {
    return this.config.mongo;
  }

  public getPort(): number {
    return this.config.port;
  }

}
