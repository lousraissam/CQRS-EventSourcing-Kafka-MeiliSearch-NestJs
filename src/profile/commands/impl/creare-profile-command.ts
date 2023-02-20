import { ICommand } from "@nestjs/cqrs";
import { CreateProfileDto } from "../../dtos/create-profile-dto";

export class CreateProfileCommand implements ICommand {
    constructor (public readonly profile: CreateProfileDto) {}

}