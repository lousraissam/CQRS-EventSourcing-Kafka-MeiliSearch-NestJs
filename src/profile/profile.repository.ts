import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { ProfileDocument } from "./profile.schema";
import { CreateProfileDto } from "./dtos/create-profile-dto";
import { Profile } from "./profile.model";

@Injectable()
export class ProfileRepository {
    constructor(@Inject('profile-mongo-model')
    private readonly model: Model<ProfileDocument>) {}

    async createOne(profile: CreateProfileDto) {
        const doc = await this.model.create(profile);
        const profileRoot = new Profile(doc.id);
        profileRoot.setProfile(doc);

        return profileRoot;
    }

    async updateOne(state: string , id: string,) {

        const profile = await this.model.updateOne( {id}, {state:state} );
        const profileUpdated = await this.model.findOne({id});
        const profileRoot = new Profile(id);
        if (profileUpdated === null) {
          throw new NotFoundException(`profile with id ${id} does not exists`);
        }
        profileRoot.setProfile(profileUpdated);
        return profileRoot;
      }
}
