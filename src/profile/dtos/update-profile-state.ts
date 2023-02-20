import { IsNotEmpty } from 'class-validator';
import { ProfileState } from '../profile_state';

export class UpdateProfileStateDto {
    @IsNotEmpty()
    state: ProfileState;
}