import { Body, Controller, Inject, Param, Post } from "@nestjs/common/decorators";
import {SearchService } from "./search.service";
import { SearchDto } from "./dtos/search_jobs_dto";

@Controller('/jobs')
export class SearchController {
    constructor(@Inject('search-service') private searchService: SearchService) {}

    @Post('')
    public async addJobToIndex(@Body() job: object[]) {
        const response = await this.searchService.addJobDocument(job);
        return response;
    }

    @Post('/search') 
    public async search(@Body() search: SearchDto) {
        return await this.searchService.search(search.text, {
            attributesToHighlight: ['*']
        });
    }

    @Post('/indexs/:index')
    public async deleteIndex(@Param('index') index: string ) {
        return await this.searchService.deleteIndex(index);
    }
}