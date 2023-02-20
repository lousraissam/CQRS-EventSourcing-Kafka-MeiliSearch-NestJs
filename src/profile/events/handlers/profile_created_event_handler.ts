import {EventsHandler, IEventHandler} from "@nestjs/cqrs"
import { ProfileCreatedEvent } from "../impl/profile-created-event"
import {Inject, Logger} from "@nestjs/common"
import { ClientKafka } from "@nestjs/microservices";

@EventsHandler(ProfileCreatedEvent)
export class ProfileCreatedEventHandler implements IEventHandler {
    constructor(@Inject('profile-client') private readonly client: ClientKafka ) {}
    
    async handle(event: ProfileCreatedEvent) {
        Logger.log(JSON.stringify(event), '******** Profile Created Event Handled ***********');
        this.client.emit('create-profile-evnt', {
            id: event.profile.id,
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
