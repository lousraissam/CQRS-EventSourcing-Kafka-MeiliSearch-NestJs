import { ICommand } from "@nestjs/cqrs";
import { UpdateProfileStateDto } from "src/profile/dtos/update-profile-state";

export class UpdateProfileStateCommand implements ICommand {
    constructor (public readonly state: UpdateProfileStateDto, public readonly id: string) {}
}