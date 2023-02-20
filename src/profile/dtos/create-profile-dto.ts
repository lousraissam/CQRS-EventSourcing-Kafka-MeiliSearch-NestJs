import { IsNotEmpty, IsString, IsArray, IsEmail } from 'class-validator'
import { ProfileState } from '../profile_state';

export class CreateProfileDto {
    id: string;
    
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    location: string

    @IsNotEmpty()
    @IsArray()
    skills: string[]

    @IsNotEmpty()
    @IsString()
    educationLevel: string

    @IsNotEmpty()
    @IsString()
    yearsOfExperence: string

    state: ProfileState
}