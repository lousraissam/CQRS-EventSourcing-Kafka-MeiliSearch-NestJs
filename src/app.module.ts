import { Module } from '@nestjs/common';
import { SearchModule } from './search/search.module';
import { ConfigModule, ConfigService } from './core/config';
import { config } from './app.config';
// import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';

// const configProvider = {
//   provide: 'CONFIG',
//   useValue: new ConfigService(config).getConfig(),
// };

@Module({
  imports: [
    ProfileModule,
    // SearchModule
  ],
    // providers: [configProvider]
})
export class AppModule {}
