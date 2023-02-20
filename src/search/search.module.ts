import { Module } from "@nestjs/common";
import { SearchController } from "./search.controller";
import { SearchService } from "./search.service";
import MeiliSearch from "meilisearch";

@Module({
    controllers: [SearchController],
    providers: [
    {
        provide: 'search-service',
        useClass: SearchService,
    },
    {
        provide: 'meilisearch',
        useFactory: () => {
            return new MeiliSearch({
                host: 'meilisearch:7700',
            })
        }
    }]
})
export class SearchModule {}