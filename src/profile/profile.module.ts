import { Inject, Module } from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import { ProfileSchema } from "./profile.schema";
import { ProfileController } from "./profile.controller";
import { ProfileRepository } from "./profile.repository";
import { ProfileService } from "./profile.service";
import { CreateCommandHandler } from "./commands/handlers/create-profile-handler";
import { ProfileCreatedEventHandler } from "./events/handlers/profile_created_event_handler";
import * as mongoose from "mongoose";
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import MeiliSearch from "meilisearch";
import { SearchProfilesQuery } from "./queries/impl/search-profiles-query";
import { SearchProfilesQueryHandler } from "./queries/handlers/search-profile-query-handler";
import { UpdateProfileStateCommandHandler } from "./commands/handlers/update-profile-state-handler";
import { ProfileStateUpdatedEventHandler } from "./events/handlers/profile-state-updated-event-handler";

@Module({
    imports: [
        ClientsModule.register([
            {
              name: 'profile-client',
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: 'profiles',
                  brokers: ["broker:29092"],
                },
                consumer: {
                  groupId: 'profiles',
                },
              },
            },
          ]),

        CqrsModule,
    ],
    providers: [
    {
        provide: 'MONGO_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
          mongoose.connect("mongodb://root:secret@profiles-mongodb/profiles?authSource=admin"),
      },
      {
        provide: 'profile-mongo-model',
        useFactory: (connection: mongoose.Connection) =>
          connection.model('profile', ProfileSchema),
        inject: ['MONGO_CONNECTION'],
      },
     {
        provide: 'meilisearch',
        useFactory: () => {
            return new MeiliSearch({
                host: 'meilisearch:7700',
            })
        }
    },
        ProfileService,
        ProfileRepository,

        CreateCommandHandler, 
        ProfileCreatedEventHandler,

        UpdateProfileStateCommandHandler,
        ProfileStateUpdatedEventHandler,

        SearchProfilesQuery,
        SearchProfilesQueryHandler,
    ],
    controllers: [ProfileController],
})
export class ProfileModule {
    constructor(@Inject('profile-client') 
    private readonly client: ClientKafka) {}
    onModuleInit() {
        new ProfileCreatedEventHandler(this.client);
        new ProfileStateUpdatedEventHandler(this.client);
    }
}