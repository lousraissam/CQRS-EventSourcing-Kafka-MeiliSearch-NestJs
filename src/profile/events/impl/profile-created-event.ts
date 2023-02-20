import {IEvent } from '@nestjs/cqrs'
import { CreateProfileDto } from 'src/profile/dtos/create-profile-dto';

export class ProfileCreatedEvent implements IEvent {
    constructor(public readonly profile: CreateProfileDto) {}
}