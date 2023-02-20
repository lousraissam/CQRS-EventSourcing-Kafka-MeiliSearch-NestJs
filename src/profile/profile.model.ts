import { AggregateRoot } from '@nestjs/cqrs'
import { ProfileCreatedEvent } from './events/impl/profile-created-event';
import { UpdateProfileStateEvent } from './events/impl/update-profile-state-event';

export class Profile extends AggregateRoot {
    profile: any;

    constructor(private readonly id:string ) {
        super();
    }

    setProfile(profile:any) { 
        this.profile = profile;
    }

    createProfile() {
        this.apply(new ProfileCreatedEvent(this.profile));
    }

    updateProfileState() {
        this.apply (new UpdateProfileStateEvent(this.profile) )
    }

}