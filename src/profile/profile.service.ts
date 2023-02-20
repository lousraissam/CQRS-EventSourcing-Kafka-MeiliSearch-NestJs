import { Injectable, Inject } from "@nestjs/common/decorators";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreateProfileDto } from "./dtos/create-profile-dto";
import { CreateProfileCommand } from "./commands/impl/creare-profile-command";
import MeiliSearch, { Index } from "meilisearch";
import { SearchProfilesQuery } from "./queries/impl/search-profiles-query";
import { InputSearchDto } from "./dtos/input-search-dto";
import { UpdateProfileStateCommand } from "./commands/impl/update-profile-state";
import { UpdateProfileStateDto } from "./dtos/update-profile-state";

@Injectable()
export class ProfileService {
    constructor(private readonly commandBus: CommandBus, 
                private readonly queryBus: QueryBus,
                @Inject('meilisearch') private client: MeiliSearch ) {}

    async createProfile(profile: CreateProfileDto) {
        return this.commandBus.execute(new CreateProfileCommand(profile));
    }
    
    async updateProfileState (state: UpdateProfileStateDto, id: string) {
        return this.commandBus.execute(new UpdateProfileStateCommand(state, id));
    }

    async searchForProfiles(search: InputSearchDto) {
        return this.queryBus.execute(new SearchProfilesQuery(search));
    }

    private getProfilesIndex(): Index {
        return this.client.index('profiles')
    }

    async addJobDocument(profileDocument: object[]) {
        const index = this.getProfilesIndex();
        return await index.addDocuments(profileDocument);
    }

    async deleteIndex(index: string ) {
        return await this.client.deleteIndex(index);
    }
}