import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs"
import { ProfileRepository } from "src/profile/profile.repository";
import { Logger } from "@nestjs/common";
import { UpdateProfileStateCommand } from "../impl/update-profile-state";

@CommandHandler(UpdateProfileStateCommand) 
export class UpdateProfileStateCommandHandler implements ICommandHandler<UpdateProfileStateCommand> {
    constructor(private readonly profileRepository: ProfileRepository,
                private readonly publisher: EventPublisher) {}

    async execute(command: UpdateProfileStateCommand) {
        Logger.log('UpdateProfileStateCommandHandler...', 'UpdateProfileStateCommand');

        const id  = command.id;
        const state = command.state.state;
        
        const profileUpdated = await this.profileRepository.updateOne(state, id);

        const publishProfileUpdated = this.publisher.mergeObjectContext(profileUpdated);
        publishProfileUpdated.updateProfileState();

        publishProfileUpdated.commit();
        
    }

}
