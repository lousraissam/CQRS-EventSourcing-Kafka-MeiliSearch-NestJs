import {Inject, Injectable } from "@nestjs/common";
import MeiliSearch from "meilisearch";
import { Index } from "meilisearch/dist/types/indexes";
import { SearchParams } from "meilisearch/dist/types/types";

@Injectable()
export class SearchService {    
    constructor(@Inject('meilisearch') private client: MeiliSearch) {}

    private getJobsIndex(): Index {
        return this.client.index('job')
    }

    async addJobDocument(jobDocument: object[]) {
        const index = this.getJobsIndex();
        return await index.addDocuments(jobDocument);
    }

    async search(text: string, searchParams?: SearchParams) {
        const index = this.getJobsIndex();
        return await index.search(text, searchParams);
    }

    async deleteIndex(index: string ) {
        return await this.client.deleteIndex(index);
    }
}