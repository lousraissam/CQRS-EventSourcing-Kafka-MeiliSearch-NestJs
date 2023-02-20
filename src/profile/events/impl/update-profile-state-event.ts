import {IEvent } from '@nestjs/cqrs'
import { CreateProfileDto } from 'src/profile/dtos/create-profile-dto';

export class UpdateProfileStateEvent implements IEvent {
    constructor(public readonly profile: CreateProfileDto) {}
}