import { IsNotEmpty, Length } from 'class-validator';

export class SearchDto  {
    @IsNotEmpty()
    @Length(2,255)
    text: string;
}