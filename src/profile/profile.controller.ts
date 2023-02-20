import { Body, Controller, Param, Post, Patch } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dtos/create-profile-dto";
import { ProfileDocument } from "./profile.schema";
import { MessagePattern, Payload} from "@nestjs/microservices"
import { InputSearchDto } from "./dtos/input-search-dto";
import { v4 as uuid } from 'uuid';
import { UpdateProfileStateDto } from "./dtos/update-profile-state";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post('/')
    async createProfile(@Body() profileDto: CreateProfileDto): Promise<ProfileDocument> {
        profileDto.id = uuid();
        return this.profileService.createProfile(profileDto);
    }

    @Patch('/:id') 
    async updateProfileState(@Body() state: UpdateProfileStateDto, @Param('id') id: string) {
        return this.profileService.updateProfileState(state, id);
    }

    @MessagePattern("create-profile-evnt")
    async addProfileToIndex(@Payload() profile) {        
        return this.profileService.addJobDocument([profile]);
    }

    @Post('/search')
    async searchForProfile(@Body() search: InputSearchDto) {
        return this.profileService.searchForProfiles(search)
    }

    @Post('/indexs/:index')
    public async deleteIndex(@Param('index') index: string ) {
        return await this.profileService.deleteIndex(index);
    }
}