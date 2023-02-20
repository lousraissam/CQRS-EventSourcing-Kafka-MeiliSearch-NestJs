import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SearchProfilesQuery } from "../impl/search-profiles-query";
import {Inject, Logger} from "@nestjs/common"
import MeiliSearch, { Index, SearchParams } from "meilisearch";

@QueryHandler(SearchProfilesQuery)
export class SearchProfilesQueryHandler implements IQueryHandler<SearchProfilesQuery> {
    constructor(@Inject('meilisearch') private readonly client: MeiliSearch) {}

    async execute(query: SearchProfilesQuery) {
        
        Logger.log("Search query handler ...");

        return this.search(query.search.text, {
                attributesToHighlight: ['*']
                 })
    }

    private getProfilesIndex(): Index {
        return this.client.index('profiles');
    }

    async search(text: string, searchParams?: SearchParams) {
        const index = this.getProfilesIndex();
        return await index.search(text, searchParams);
    }
}