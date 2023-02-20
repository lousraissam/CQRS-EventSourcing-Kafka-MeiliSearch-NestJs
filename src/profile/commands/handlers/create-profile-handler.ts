import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs"
import { CreateProfileCommand } from "../impl/creare-profile-command";
import { ProfileRepository } from "src/profile/profile.repository";
import { Logger } from "@nestjs/common";

@CommandHandler(CreateProfileCommand) 
export class CreateCommandHandler implements ICommandHandler<CreateProfileCommand> {
    constructor(private readonly profileRepository: ProfileRepository,
                private readonly publisher: EventPublisher) {}

    async execute(command: CreateProfileCommand) {
        Logger.log('createProfileHandler...', 'CreateProfileCommand');

        const { profile } = command;
        const profileCreated = await this.profileRepository.createOne(profile);
        
        const publishProfile = this.publisher.mergeObjectContext(profileCreated);
        publishProfile.createProfile();

        publishProfile.commit();
        
    }

}
