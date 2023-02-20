import {EventsHandler, IEventHandler} from "@nestjs/cqrs"
import {Inject, Logger} from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices";
import { UpdateProfileStateEvent } from "../impl/update-profile-state-event";

@EventsHandler(UpdateProfileStateEvent)
export class ProfileStateUpdatedEventHandler implements IEventHandler {
    constructor(@Inject('profile-client') private readonly client: ClientKafka ) {}
    
    async handle(event: UpdateProfileStateEvent) {
        Logger.log(JSON.stringify(event), '******** Profile state created Event Handled ***********');
        this.client.emit('create-profile-evnt', {
            id: event.profile.id,
            state: event.profile.state,
            firstName: event.profile.firstName,
            lastName: event.profile.lastName,
            email: event.profile.email,
            location: event.profile.location,
            skills: event.profile.skills,
            educationLevel: event.profile.educationLevel,
            yearsOfExperience: event.profile.yearsOfExperence,
        })
    }
} 
